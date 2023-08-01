import {Octokit} from 'octokit';
import {create} from './create.js';
import {read} from './read.js';

export const readGist = async (hash, {token}) => {
    return await read(hash, create({
        token,
        Octokit,
    }));
};
