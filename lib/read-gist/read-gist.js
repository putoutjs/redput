import {Octokit} from 'octokit';
import {create} from './create.js';
import {read} from './read.js';

export const readGist = async (url, {token}) => {
    return await read(url, create({
        token,
        Octokit,
    }));
};
