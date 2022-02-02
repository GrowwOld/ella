import React from 'react';

class JsonLd extends React.PureComponent<Props> {
  render() {
    const schemaData = JSON.stringify(this.props.schemaData);

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaData }}
      />
    );
  }
}


type RequiredProps = {

}


type DefaultProps = {
  schemaData: object;
}


type Props = RequiredProps & DefaultProps;

export default JsonLd;
