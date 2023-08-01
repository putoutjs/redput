import {Octokit} from 'octokit';

export const readGist = async (url, {token}) => {
    const octokit = new Octokit({
        auth: token,
    });
    
    return await octokit.request(`GET /gists/${url}`, {
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
        },
    });
};
