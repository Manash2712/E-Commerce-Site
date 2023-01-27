
// taking func as an input. passing it to second func. fn is input for async func.
// goal is that regardless the function we paas is handled in async way or not, now it will handle it in async way.
// pass any function and now it will handle it in async way.

/*
    const asyncHandler = () => {};
    const asyncHandler = (func) => {};
    const asyncHandler = (func) => ()=> {};
    const asyncHandler = (func)=> async () => {};
*/
const asyncHandler = (fn) => async (req,res,next) => {
    try {
        await fn(req,res,next)
    } catch (err) {
        res.status(err.code || 500).json({
            success: false,
            message: err.message
        })
    }
}

// or
/*
    function asyncHandler(fn){
        return async function (req,res,next){
            try {
                await fn(req,res,next)
            } 
            catch (err) {
                res.status(err.code || 500).json({
                    success: false,
                    message: err.message
                })
            }
        }
    }
*/

export default asyncHandler;