/**
 Khi chạy, vào link http://localhost:3000/api-docs/ để mở Swagger
 Khi thêm 1 api mới vào swagger cần làm:
 - Thêm đường dẫn vào phần path, thêm các trường thông tin tương tự như mẫu dưới đây
 - Thêm schema trong phần component, để hiển thị mẫu trong phần request body
 */
/**
 "đường dẫn": {
                    "post": {
                        "tags": [" tên"],
                        "summary": "hướng dẫn",
                        "operationId": "định danh",
                        "parameters": [],
                        "requestBody": {
                            "description": "mô tả",
                            "content": { //Tham chiếu tới schema
                                "application/json": {"schema": {"$ref": "#/components/schemas/Users"}},
                                "application/xml": {"schema": {"$ref": "#/components/schemas/Users"}}
                            },
                            "required": true
                        },
                        "responses": {
                            "200": {"description": "create_document_success"},
                            "401": {"description": "create_document_false", "content": {}}
                        },
                        "x-codegen-request-body-name": "body"
                    }
                },
 */
                const swaggerJsonData =
                {
                    "openapi": "3.0.3",
                    "info": {
                        "title": "Api web bán hàng Trịnh Đăng Khoa",
                        "description": "Chứa danh sách các Api và test",
                        "contact": {"email": "khoatd@gmail.com"},
                        "version": "1.0.5"
                    },
                    "servers": [{"url": "http://localhost:3000"}],
                    "tags": [ {
                        "name": "Authentication",
                        "description": "Api module Authentication"
                    }],
                    "paths": {
                        "/auth/login": {
                            "post": {
                                "tags": ["Authentication"],
                                "summary": "Đăng nhập",
                                "operationId": "Login",
                                "parameters": [],
                                "requestBody": {
                                    "description": "Nhập thông tin tài khoản users",
                                    "content": {
                                        "application/json": {"schema": {"$ref": "#/components/schemas/Users"}},
                                        "application/xml": {"schema": {"$ref": "#/components/schemas/Users"}}
                                    },
                                    "required": true
                                },
                                "responses": {
                                    "200": {"description": "Đăng nhập thành công"},
                                    "401": {"description": "Đăng nhập thất bại", "content": {}}
                                },
                                "x-codegen-request-body-name": "body"
                            }
                        },
                },
                    "components": {
                        "schemas": {
                            "Users": {
                                 "type": "object", "properties": {
                                    "account":    {"type": "string"},
                                    "password": {"type": "string"},
                                }
                            },
                            
                        },
                    }
                }
                exports.swaggerJsonData = swaggerJsonData;