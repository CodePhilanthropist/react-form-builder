/** @jsx jsx */
/** @jsxRuntime classic */
import { Link, jsx } from 'theme-ui'

import Checkbox from '../../Fields/Checkbox'
import ErrorMessage from '../../Fields/Error'
import Label from '../../Fields/Label'

import ReactMarkdown from 'react-markdown'

const disableOthers = (e) => {
  Object.entries(e.target.form).forEach(([, v]) => {
    if (e.target.checked === true) {
      if (v.type === 'checkbox' && v.name === e.target.name) {
        v.checked = false
        v.disabled = true
      }
      e.target.disabled = false
      e.target.checked = true
    }
    if (e.target.checked === false) {
      if (v.type === 'checkbox' && v.name === e.target.name) {
        v.disabled = false
      }
    }
  })
}

const QuestionMultipleCheckboxes = ({ component, form, question, useForm }) => {
  const { getValues, errors, register } = useForm
  return (
    <div
      sx={{
        variant: question.id
          ? 'forms.multipleCheckboxesContainer.' + question.id
          : 'forms.multipleCheckboxesContainer'
      }}
    >
      <fieldset sx={{ border: '0', m: '0', p: '0' }}>
        {question.label && (
          <legend sx={{ variant: 'forms.label' }} htmlFor={question.name}>
            {question.label}
          </legend>
        )}
        <div
          sx={{
            variant: question.checkboxId
              ? 'forms.multipleCheckboxes' + question.checkboxId
              : 'forms.multipleCheckboxes'
          }}
        >
          {question.config &&
            question.config.options.map((option) => {
              return (
                <div
                  sx={{
                    variant: 'forms.multipleCheckboxes.checksContainer'
                  }}
                  key={option.value}
                >
                  <Label
                    htmlFor={option.name}
                    sx={{
                      variant: 'forms.multipleCheckboxes.label',
                      alignItems: 'center'
                    }}
                  >
                    <Checkbox
                      data-testid='question-singleCheckbox'
                      id={option.name}
                      aria-describedby={'error_message_' + question.name}
                      name={question.name}
                      value={option.value}
                      ref={register({
                        ...question.registerConfig,
                        validate: {
                          minimumLen: question.registerConfig.minimumLen
                            ? () =>
                                getValues()[question.name] &&
                                getValues()[question.name].length >=
                                  question.registerConfig.minimumLen
                            : () => true,
                          maximumLen: question.registerConfig.maximumLen
                            ? () =>
                                getValues()[question.name] &&
                                getValues()[question.name].length <=
                                  question.registerConfig.maximumLen
                            : () => true
                        }
                      })}
                      onChange={option.disableOthers && disableOthers}
                    />
                    {option.src ? (
                      <img src={option.src} />
                    ) : (
                      <ReactMarkdown
                        sx={{
                          p: { m: '0px' }
                        }}
                        source={option.label}
                        renderers={{
                          // eslint-disable-next-line react/display-name
                          link: ({ href, children }) => (
                            <Link href={href} target='_blank'>
                              {children}
                            </Link>
                          )
                        }}
                      />
                    )}
                  </Label>
                </div>
              )
            })}
          {errors[question.name] && errors[question.name].type && (
            <ErrorMessage
              name={question.name}
              sx={{
                gridColumn: 1
              }}
              message={
                question.errorMessages &&
                question.errorMessages[errors[question.name].type]
              }
            />
          )}
        </div>
      </fieldset>
    </div>
  )
}

export default QuestionMultipleCheckboxes
