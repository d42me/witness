// /* eslint-disable import/prefer-default-export, no-shadow */
// import React from 'react';
// import PropTypes from 'prop-types';
// import { View, Text } from 'react-native';
// import { Input as FormInput, Item, Label } from 'native-base';
// import { width } from 'react-native-dimension';

// const propTypes = {
//   input: PropTypes.object.isRequired,
//   meta: PropTypes.object.isRequired,
//   placeholder: PropTypes.string.isRequired,
//   secureTextEntry: PropTypes.bool,
//   multiline: PropTypes.bool,
//   containerStyle: PropTypes.object,
// };

// const defaultProps = {
//   secureTextEntry: false,
//   multiline: false,
//   containerStyle: {},
// };

// const PhoneInput = (props) => {
//   const { inputContainer, InputText, errorText } = styles;
//   const {
//     input: { value, onChange },
//     meta: { touched, error },
//     placeholder,
//     secureTextEntry,
//     multiline,
//     containerStyle,
//     ...otherProps
//   } = props;

//   return (
//       <Item style={[inputContainer, containerStyle]} floatingLabel error={error}>
//         <Label style={{ color: '#fff' }}>{placeholder}</Label>
//         <FormInput
//           placeholderTextColor="#fff"
//           multiline={multiline}
//           secureTextEntry={secureTextEntry}
//           autoCorrect={false}
//           style={InputText}
//           onChangeText={value => onChange(value)}
//           value={value}
//           {...otherProps}
//         />
//       </Item>
//   );
// };

// const styles = {
//   inputContainer: {
//     borderBottomWidth: 1,
//     alignSelf: 'center',
//     width: width(50),
//   },
//   InputText: {
//     color: '#fff'
//   },
//   errorText: {
//     color: '#ff5964',
//   },
// };

// PhoneInput.defaultProps = defaultProps;
// PhoneInput.propTypes = propTypes;

// export { PhoneInput };
