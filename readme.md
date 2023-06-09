# CloseAI 妙见智能


在前后端通信使用 JSON 格式时，code 和 message 是用来标识请求结果的状态和信息的。

code 通常是一个数字，用于表示请求结果的状态，比如：

- 200 表示请求成功
- 400 表示请求参数错误
- 401 表示用户未登录
- 500 表示服务器内部错误

message 则是一个字符串，用于描述请求结果的信息，比如：

- 请求成功，返回数据
- 请求参数错误，请检查参数
- 用户未登录，请先登录
- 服务器内部错误，请联系管理员

通过 code 和 message，前端可以根据请求结果的状态和信息进行相应的处理，比如：

- 请求成功，将返回的数据渲染到页面上
- 请求参数错误，弹出提示框提示用户检查参数
- 用户未登录，跳转到登录页面
- 服务器内部错误，提示用户稍后再试或者联系管理员

在实际开发中，通常会根据具体的业务需求定义不同的 code 和 message，以便更好地处理请求结果。
