import React, { FC, useState } from 'react';
import { Form, Checkbox } from 'semantic-ui-react';
import '../index.css'

interface SC2Map {
    id: number;
    name: string;
    kicked?: boolean;
    onCheck: (id: number, checked: boolean) => void;
}

const MapPanel: FC<SC2Map> = props => {
    const { id, name, kicked, onCheck } = props;
    const [checked, setChecked] = useState(false);
    return (
        <Form.Field
            control={Checkbox}
            label={name}
            disabled={kicked}
            onChange={() => {
                onCheck(id, !checked);
                setChecked(c => !c);
            }
            }
        >
        </Form.Field>
    )
}

export default MapPanel;