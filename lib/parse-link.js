export const PUTOUT_EDITOR = 'https://putout.cloudcmd.io/#/gist/';
export const MOBILE_PUTOUT_EDITOR = 'https://putout.vercel.app/#/gist/';

export const parseLink = (link) => {
    return link
        .replace(PUTOUT_EDITOR, '')
        .replace(MOBILE_PUTOUT_EDITOR, '');
};
