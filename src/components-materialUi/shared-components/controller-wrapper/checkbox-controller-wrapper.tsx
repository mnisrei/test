import { FormControlLabel, Typography } from '@mui/material'
import CheckboxWrapper from '@shared-components/widget-wrapper/checkbox-wrapper'
import { Controller, Control, FieldValues, RegisterOptions } from 'react-hook-form'

function CheckboxControllerWrapper({ formContext, controlName = '', controlId, label, placeHolder, error, errorMessage, controlValidationRules }: {
    formContext?: Control<any>,
    controlName?: string,
    controlId?: string,
    error?: boolean,
    placeHolder?: string
    label?: string
    errorMessage?: string
    controlValidationRules?: Omit<RegisterOptions<FieldValues, string>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled">
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
                control={formContext}
                rules={controlValidationRules}
                render={({ field }) => (
                    <FormControlLabel
                        label={placeHolder}
                        id={controlId}
                        {...field}
                        control={
                            <CheckboxWrapper />
                        }
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



export default CheckboxControllerWrapper