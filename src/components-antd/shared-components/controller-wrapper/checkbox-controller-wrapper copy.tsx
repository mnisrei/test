import { Controller, Control, FieldValues, RegisterOptions } from 'react-hook-form'
import { Typography } from 'antd'
import CheckboxWrapper from '@shared-components-antd/widget-wrapper/checkbox-wrapper'

function CheckboxControllerWrapper({ control, controlName = '', controlId, label, placeHolder, error, errorMessage, controlValidationRules }: {
    control?: Control<any>,
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
                control={control}
                rules={controlValidationRules}
                render={({ field }) => (
                    <CheckboxWrapper
                        id={controlId}
                        {...field}
                    >
                        {placeHolder}
                    </CheckboxWrapper>
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



export default CheckboxControllerWrapper