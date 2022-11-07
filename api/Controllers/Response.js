async function StatusOk(req, res, status, data) {
  if (status === 200) {
    res.status(status).json({
      status: status,
      data: data,
    });
  }
}

async function Error(req, res, status, msg) {
  if (status === 400) {
    res.status(status).json({
      status: status,
      error: msg,
    });
  }
}

async function Internal(req, res, status, msg) {
  if (status === 500) {
    res.status(status).json({
      status: status,
      error: msg,
    });
  }
}

module.exports = {
  StatusOk,
  Error,
  Internal,
};
