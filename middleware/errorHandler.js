const {constants}=require('../constants')

const errorHandler=(err,req,res,next)=>{
    const statusCode=res.statusCode ? res.statusCode : 500;
    console.log(statusCode);
    switch (statusCode) {
      case constants.VALIDATION_ERROR:
        res.json({
          title: "validation failed",
          message: err.message,
          stackTrace: err.stack,
        });
      case constants.NOT_FOUND:
        res.json({
          title: "not found",
          message: err.message,
          stackTrace: err.stack,
        });
      case constants.UNAUTHORISED:
        res.json({
          title: "unauthorised access",
          message: err.message,
          stackTrace: err.stack,
        });
      case constants.FORBIDDEN:
        res.json({
          title: "FORBIDDEN",
          message: err.message,
          stackTrace: err.stack,
        });
      case constants.SERVER_ERROR:
        res.json({
          title: "SERVER ERROR",
          message: err.message,
          stackTrace: err.stack,
        });
        default:
            console.log("All good");
            break;
    }
}

module.exports=errorHandler;