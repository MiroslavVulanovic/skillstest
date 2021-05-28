import { useState, useEffect, useCallback } from 'react';
import { get_prop_values, is_object, is_required, VALUE, ERROR } from './utils';

/**
 * @param {object} stateSchema
 * @param {object} stateValidatorSchema
 * @param {function} submitFormCallback
 */
function useForm(
  stateSchema = {},
  stateValidatorSchema = {},
  submitFormCallback
) {
  const [state, setStateSchema] = useState(stateSchema);

  const [values, setValues] = useState(get_prop_values(state, VALUE));
  const [errors, setErrors] = useState(get_prop_values(state, ERROR));
  const [dirty, setDirty] = useState(get_prop_values(state, false));

  const [disable, setDisable] = useState(true);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setStateSchema(stateSchema);
    setDisable(true);
    setInitialErrorState();
  }, []);

  useEffect(() => {
    const values = get_prop_values(state, VALUE);
    setValues(values);
    setErrors(
      Object.keys(values).reduce((accu, curr) => {
        accu[curr] = validateField(curr, values[curr]);
        return accu;
      }, {})
    );
  }, [state]);

  useEffect(() => {
    if (isDirty) {
      setDisable(validateErrorState());
    }
  }, [errors, isDirty]);

  const setFieldValue = ({ name, value }) => {
    setValues(prevState => ({ ...prevState, [name]: value }));
    setDirty(prevState => ({ ...prevState, [name]: true }));
  };

  const setFieldError = ({ name, error }) =>
    setErrors(prevState => ({ ...prevState, [name]: error }));

  const validateField = useCallback(
    (name, value) => {
      const validator = stateValidatorSchema;

      if (!validator[name]) return;

      const field = validator[name];

      let error = '';
      error = is_required(value, field.required);

      if (is_object(field['validator']) && error === '') {
        const validateFieldByCallback = field['validator'];

        if (!validateFieldByCallback['func'](value, values)) {
          error = validateFieldByCallback['error'];
        }
      }

      return error;
    },
    [stateValidatorSchema, values]
  );

  const setInitialErrorState = useCallback(() => {
    Object.keys(errors).map(name =>
      setFieldError({ name, error: validateField(name, values[name]) })
    );
  }, [errors, values, validateField]);

  const validateErrorState = useCallback(
    () => Object.values(errors).some(error => error),
    [errors]
  );

  const handleOnSubmit = useCallback(
    event => {
      event.preventDefault();

      if (!validateErrorState()) {
        submitFormCallback(values);
      }
    },
    [validateErrorState, submitFormCallback, values]
  );

  const handleOnChange = useCallback(
    event => {
      setIsDirty(true);

      const name = event.target.name;
      const value = event.target.value;

      const error = validateField(name, value);

      setFieldValue({ name, value });
      setFieldError({ name, error });
    },
    [validateField]
  );

  return {
    dirty,
    values,
    errors,
    disable,
    setStateSchema,
    setFieldValue,
    setFieldError,
    handleOnChange,
    handleOnSubmit,
    validateErrorState,
  };
}

export default useForm;
