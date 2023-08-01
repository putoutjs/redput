export const read = async (hash, octokit) => {
    return await octokit.request(`GET /gists/${hash}`, {
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
        },
    });
};
