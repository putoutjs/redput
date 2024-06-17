export const report = (path) => {
    const {name} = path.node.left;
    return `Declare '${name}', before assignment`;
};
