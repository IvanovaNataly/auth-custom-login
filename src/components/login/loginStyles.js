import { css } from "@emotion/react";

const boxWidth =  420;

export const loginStyles = {
    container: {
        width: boxWidth,
        flexBasis: boxWidth,
    },
    textField: {
        height: 80,
        marginBottom: 1.5
    },
    avatar: {
        width: 80,
        height: 80,
        marginRight: 'auto',
        marginBottom: 2,
        marginLeft: 'auto',
    },
    link: {
        display: 'inline-block',
        marginLeft: 4
    },
    paragraph: {
        marginBottom: 2,
        '&:last-of-type': {
            marginBottom: 4
        }
    }
}
