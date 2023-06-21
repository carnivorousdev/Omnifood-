import React, { useContext, useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react/lib/cjs/main/ts';
import AppContext from 'context/Context';
import { getColor } from 'helpers/utils';

const TinymceEditor = ({ value, handleChange }) => {
  const {
    config: { isDark, isRTL }
  } = useContext(AppContext);
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.dom.addStyle(
        `body{color: ${getColor('white')} !important;}`
      );
    }
  }, [isDark]);

  return (
    <Editor
      onInit={(evt, editor) => (editorRef.current = editor)}
      value={value}
      onEditorChange={handleChange}
      apiKey={process.env.REACT_APP_TINYMCE_APIKEY}
      init={{
        height: '50vh',
        menubar: false,
        content_style: `body { color: ${getColor('black')} }`,
        mobile: {
          toolbar:'styleselect | bold italic link bullist numlist image blockquote undo redo'
        },
        statusbar: false,
        plugins: 'link image lists table media directionality',
        toolbar:
          'styleselect | bold italic link bullist numlist image blockquote table undo redo',

        directionality: isRTL ? 'rtl' : 'ltr',
        theme_advanced_toolbar_align: 'center'
      }}
    />
  );
};

export default TinymceEditor;
