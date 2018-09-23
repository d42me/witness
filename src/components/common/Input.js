// /* eslint-disable import/prefer-default-export, no-shadow */
// import React from 'react';
// import PropTypes from 'prop-types';
// import { Platform } from 'react-native';
// import { Input as FormInput, Item, Label, Icon } from 'native-base';
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

// const Input = (props) => {
//   const { inputContainer, InputText } = styles;
//   const {
//     input: { value, onChange },
//     meta: { touched, error },
//     placeholder,
//     secureTextEntry,
//     multiline,
//     containerStyle,
//     ...otherProps
//   } = props;
//   const isInvalidInput = !!(touched && error);
//   const labelContent = (touched && error) ? error : placeholder;
//   const labelColor = (touched && error) ? 'red' : '#232323';
//   return (
//       <Item style={[inputContainer, containerStyle]} floatingLabel error={isInvalidInput}>
//         <Label style={{ color: labelColor, fontFamily: 'Avenir', opacity: 0.8, fontSize: 16 }}>
//           {labelContent}
//         </Label>
//         {
//           isInvalidInput ?
//           (
//             <Icon name='close-circle' />
//           )
//           : null
//         }
//         <FormInput
//           placeholderTextColor="#232323"
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
//     width: width(85)
//   },
//   InputText: {
//     color: '#fff',
//     fontFamily: 'Avenir',
//     fontSize: (Platform.OS === 'ios' ? 17 : 16),
//   },
//   errorText: {
//     color: '#ff5964',
//   },
// };

// Input.defaultProps = defaultProps;
// Input.propTypes = propTypes;

// export { Input };
