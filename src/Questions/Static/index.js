/** @jsx jsx */
/** @jsxRuntime classic */
import { jsx } from 'theme-ui'

import Input from '../../Fields/Input'
import Label from '../../Fields/Label'

const QuestionStatic = ({ question, useForm }) => {
  const { register } = useForm

  return (
    <div key={question.name} sx={{ display: 'none' }}>
      <Label htmlFor={question.name}>
        <Input
          id={question.name}
          name={question.name}
          defaultValue={question.defaultValue || true}
          ref={register({
            ...question.registerConfig
          })}
        />
      </Label>
    </div>
  )
}

export default QuestionStatic
