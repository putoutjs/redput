export const report = () => `Apply namespace`;

export const replace = () => ({
    'import __a from "__b"': 'import * as __a from "__b"',
});
