import fetch from 'node-fetch';

export const create = ({token, Octokit}) => {
    return new Octokit({
        auth: token,
        request: {
            fetch,
        },
    });
};
