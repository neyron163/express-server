export function getElementId(arr, paramsId) {
    const { _id: id } = arr.find(element => element.id === Number(paramsId)) || { _id: null };
    return id;
}

export const handleError = (err, res) =>
    res.send({
        success: false,
        error: err,
    });
