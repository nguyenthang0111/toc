
import { ColorPicker, Checkbox, VerticalStack, Icon, Select, Form, Text, Button, TextField, LegacyCard, FormLayout } from "@shopify/polaris";
import { Toast } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
import { useState, useCallback, useEffect } from 'react';
import {TextAlignmentRightMajor} from '@shopify/polaris-icons';
import { Size } from "@shopify/app-bridge/actions/Modal";
import { useMutation, useQuery } from "react-query";
import axios from "axios";

export function Customize({ setSetting }) {

  const [dataSetting, setDataSetting] = useState({});
  const [title, setTitle] = useState('');
  const [indentation, setIndentation] = useState('Off');
  const [section, setSection] = useState('On');
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);

  // Get domain 
  const {
    data,
    isLoading,
    isRefetching,
  } = useAppQuery({
    url: "/api/domain",
    reactQueryOptions: {
    },
  });
 
  useEffect(async () => {
    console.log(data);
    axios.get(`/setting/get?domain=${data.domain}`)
        .then(response => {
          setDataSetting(response.data)
          console.log(response.data)
          setTitle(response.data.toc.title)
          setIndentation(response.data.toc.indentation)
          setSection(response.data.toc.section)
          setChecked1(response.data.toc.h1)
          setChecked2(response.data.toc.h2)
          setChecked3(response.data.toc.h3)
          setChecked4(response.data.toc.h4)
        });
  }, [data])


  const handleTitleChange = useCallback(
    (value) => {
      setTitle(value); 
    },
    [title],
  );

  //Select Indentation
  const handleIndentationChange = useCallback(
    (value) => {
      setIndentation(value);
    },
    [indentation],
  );

  const options1 = [
    {label: 'On', value: 'On'},
    {label: 'Off', value: 'Off'},
  ];

  // Select Section Line
  const handleSectionChange = useCallback(
    (value) => {
      setSection(value);
    },
    [section],
  );
  const options2 = [
    {label: 'On', value: 'On'},
    {label: 'Off', value: 'Off'},
  ];

//Headings

const handleChange1 = useCallback(
  (value) => { 
    setChecked1(value);
  },
  [checked1],
);

const handleChange2 = useCallback(
  (value) => { 
    setChecked2(value);
  },
  [checked2],
);

const handleChange3 = useCallback(
  (value) => { 
    setChecked3(value);
  },
  [checked3],
);

const handleChange4 = useCallback(
  (value) => { 
    setChecked4(value);
  },
  [checked4],
);
//Color
const [color1, setColor1] = useState({
  hue: 120,
  brightness: 1,
  saturation: 1,
});
const [color2, setColor2] = useState({
  hue: 120,
  brightness: 1,
  saturation: 1,
});
const [color3, setColor3] = useState({
  hue: 120,
  brightness: 1,
  saturation: 1,
});

const mutation = useMutation((data) => {
  return axios.put("/setting/update", data);
});

    const handleSubmit = () => {
      mutation.mutate({
        title: title,
        indentation: indentation,
        section: section,
        checked1: checked1,
        checked2: checked2,
        checked3: checked3,
        checked4: checked4,
        domain: dataSetting.domain
      });
    }

    return (
      <Form onSubmit={handleSubmit} >
         <FormLayout>
          <LegacyCard>
            <VerticalStack >
              <div style={{ padding:'15px'}}>
              <TextField
                label="Table Of Contents Title"
                type="text"
                value={title}
                onChange={handleTitleChange}
                helpText="If you do not need a Header, leave it blank."
                autoComplete="off"
              />
              <Select
                prefix={<Icon source={TextAlignmentRightMajor} />}
                label="Indentation"
                options={options1}
                onChange={handleIndentationChange}
                value={indentation}
              />

              <Select
                label="Section Line"
                options={options2}
                onChange={handleSectionChange}
                value={section}
              />
              <VerticalStack>
                <Text> Headings </Text>
                <Checkbox
                  label="h1"
                  checked={checked1}
                  onChange={handleChange1}
                  value={checked1}
                />
                <Checkbox
                  label="h2"
                  checked={checked2}
                  onChange={handleChange2}
                  value={checked2}
                />
                <Checkbox
                  label="h3"
                  checked={checked3}
                  onChange={handleChange3}
                  value={checked3}
                />
                <Checkbox
                  label="h4"
                  checked={checked4}
                  onChange={handleChange4}
                  value={checked4}
                />
              </VerticalStack>
            <VerticalStack>
          
              <Text>Color of background</Text>
              <ColorPicker onChange={setColor1} color={color1} />
              <Text>Color of line</Text>
              <ColorPicker onChange={setColor2} color={color2} />
              <Text>Color of text</Text>
              <ColorPicker onChange={setColor3} color={color3} />
              
            </VerticalStack>
          </div>
        </VerticalStack>
      </LegacyCard>
      </FormLayout>
      
        <Button submit>Submit</Button>
      </Form>
    );
  }
