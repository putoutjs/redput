export const parsePlugin = (raw) => {
    const [comment, ...lines] = raw.split('\n');
    const name = comment
        .replace('//', '')
        .trimStart();
    
    return {
        name,
        lines,
    };
};
