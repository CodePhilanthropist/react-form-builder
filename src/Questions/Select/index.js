/** @jsx jsx */
/** @jsxRuntime classic */
import ErrorMessage from '../../Fields/Error'

import React from 'react'
import Select from '../../Fields/Select'
import Label from '../../Fields/Label'
import { jsx } from 'theme-ui'

const styles = {
  fullWidth: {
    gridColumnStart: '1',
    gridColumnEnd: '3'
  },
  selectOption: {
    background: 'bg',
    color: 'black'
  }
}

const getOptions = (question) => {
  return (
    question.config &&
    question.config.options.map((option) => {
      return {
        value: option.value,
        label: option.label
      }
    })
  )
}

const QuestionSelect = ({ question, useForm, component, ...props }) => {
  const { register, errors, setValue, unregister, trigger } = useForm

  return (
    <React.Fragment>
      <div
        sx={{
          variant: question.id
            ? 'forms.selectContainer.' + question.id
            : 'forms.selectContainer'
        }}
      >
        {question.label && (
          <Label htmlFor={question.name}>{question.label}</Label>
        )}
        <Select
          onChange={() => {
            trigger(question.name)
          }}
          id={question.name}
          aria-describedby={'error_message_' + question.name}
          {...props}
          options={getOptions(question)}
          isSearchable={false}
          placeholder={question.placeholder}
          key={question.name}
          name={question.name}
          register={register}
          registerConfig={question.registerConfig}
          setValue={setValue}
          unregister={unregister}
          label={question.label}
        >
          {question.config &&
            question.config.options.map((option) => {
              return (
                <option
                  key={option.value}
                  value={option.value}
                  sx={styles.selectOption}
                >
                  {option.label}
                </option>
              )
            })}
        </Select>
        {errors[question.name] &&
          (errors[question.name].type === 'required' ||
            errors[question.name].type === 'noEmpty') && (
            <ErrorMessage
              name={question.name}
              message={
                question.errorMessages && question.errorMessages.required
              }
            />
          )}
      </div>
    </React.Fragment>
  )
}

export default QuestionSelect
