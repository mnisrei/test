import { Controller, Control, FieldValues, RegisterOptions } from 'react-hook-form'
import { Typography } from '@mui/material'
import InputWrapper from '@shared-components-mui/widget-wrapper/input-wrapper'

function InputControllerWrapper({ control, controlName = '', controlId, placeHolder, label, error, errorMessage, controlValidationRules }: {
    control?: Control<any>,
    controlName?: string,
    controlId?: string,
    error?: boolean,
    placeHolder?: string
    label?: string
    errorMessage?: string
    controlValidationRules?: Omit<RegisterOptions<FieldValues, string>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled">,
}) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            width: '100%'
        }}>
            {label && (
                <Typography variant='body2'>
                    {label}
                </Typography>
            )
            }
            <Controller
                name={controlName}
                control={control}
                rules={controlValidationRules}
                render={({ field }) => (
                    <InputWrapper
                        id={controlId}
                        placeholder={placeHolder}
                        error={error}
                        sx={{
                            input: {
                                color: 'black',
                                width: '100%'
                            }
                        }}
                        {...field}
                    />
                )}
            />
            {
                error && <Typography variant='body2' color='error'>
                    {errorMessage}
                </Typography>
            }
        </div>
    )
}



export default InputControllerWrapper