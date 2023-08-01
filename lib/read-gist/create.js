export const create = ({token, Octokit}) => {
    return new Octokit({
        auth: token,
    });
};
    
