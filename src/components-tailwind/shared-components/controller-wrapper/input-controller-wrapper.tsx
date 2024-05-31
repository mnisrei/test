import { Controller, Control, FieldValues, RegisterOptions } from 'react-hook-form'
import InputWrapper from '../widget-wrapper/input-wrapper'
import { Typography } from 'antd'

function InputControllerWrapper({ formContext, controlName = '', controlId, placeHolder, label, error, errorMessage, controlValidationRules }: {
    formContext?: Control<any>,
    controlName?: string,
    controlId?: string,
    error?: boolean,
    placeHolder?: string
    label?: string
    errorMessage?: string
    controlValidationRules?: Omit<RegisterOptions<FieldValues, string>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled">
}) {
    const { Text } = Typography

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            width: '100%'
        }}>
            {label && (
                <Text typeof='h5'>
                    {label}
                </Text>
            )
            }
            <Controller
                name={controlName}
                control={formContext}
                rules={controlValidationRules}
                render={({ field }) => (
                    <InputWrapper
                        id={controlId}
                        placeholder={placeHolder}
                        status={error ? 'error' : ''}
                        {...field}
                    />
                )}
            />
            {
                error && <Text type='danger'>
                    {errorMessage}
                </Text>
            }
        </div>
    )
}



export default InputControllerWrapper