const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mentorly API",
      description: "API for connecting mentors and mentees.",
      version: "1.0.0"
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server"
      }
    ],
    tags: [
      {
        name: "Users",
        description: "Operations related to user management"
      },
      {
        name: "Fields",
        description: "Operations related to fields management"
      }
    ],
    components: {
      securitySchemes: {
        CookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "access_token"
        }
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "integer" },
            email: { type: "string" },
            name: { type: "string" },
            surname: { type: "string" },
            type: { type: "string", enum: ["mentor", "mentee"] },
            position: { type: "string", enum: ["intern", "junior", "mid", "senior", "lead"] },
            field: { type: "string", enum: ["doctor", "engineer", "mathematician", "other"] },
            specification: { type: "string" },
            description: { type: "string" },
            education: { type: "string" },
            experience: { type: "string" },
            about: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" }
          }
        },
        SigninRequest: {
          type: "object",
          properties: {
            email: { type: "string" },
            password: { type: "string" }
          },
          required: ["email", "password"]
        },
        LoginRequest: {
          type: "object",
          properties: {
            email: { type: "string" },
            password: { type: "string" }
          },
          required: ["email", "password"]
        },
        UpdateProfileRequest: {
          type: "object",
          properties: {
            data: {
              type: "object",
              properties: {
                name: { type: "string" },
                surname: { type: "string" },
                type: { type: "string", enum: ["mentor", "mentee"] },
                position: { type: "string" },
                field: { type: "string" },
                specification: { type: "string" },
                description: { type: "string" },
                education: { type: "string" },
                experience: { type: "string" },
                about: { type: "string" }
              }
            }
          }
        },
        GetUsersRequest: {
          type: "object",
          properties: {
            limit: { type: "integer" },
            offset: { type: "integer" },
            sort: {
              type: "array",
              items: {
                type: "array",
                items: [
                  { type: "string", enum: ["name", "surname"] },
                  { type: "string", enum: ["ASC", "DESC"] }
                ],
                minItems: 2,
                maxItems: 2
              }
            },
            name: { type: "string" },
            surname: { type: "string" },
            type: { type: "string", enum: ["mentor", "mentee"] }
          }
        },
        Education: {
          type: "object",
          properties: {
            data: {
              type: "object",
              properties: {
                startDate: { type: "string", format: "date" },
                endDate: { type: "string", format: "date" },
                institutionTitle: { type: "string" }
              }
            }
          },
          required: ["startDate", "institutionTitle"]
        },
        Experience: {
          type: "object",
          properties: {
            data: {
              type: "object",
              properties: {
                startDate: { type: "string", format: "date" },
                endDate: { type: "string", format: "date" },
                companyName: { type: "string" }
              }
            }
          },
          required: ["startDate", "companyName"]
        },
        AttachPositionRequest: {
          type: "object",
          properties: {
            data: {
              type: "object",
              properties: {
                title: { type: "string" }
              }
            }
          },
          required: ["data"]
        },
        AttachFieldsRequest: {
          type: "object",
          properties: {
            data: {
              type: "object",
              properties: {
                fieldIds: {
                  type: "array",
                  items: { type: "integer" }
                }
              }
            }
          },
          required: ["data"]
        },
        Field: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" }
          }
        }
      }
    },
    security: [
      {
        CookieAuth: []
      }
    ],
    paths: {
      "/api/v1/users/signin": {
        post: {
          summary: "User Signin",
          tags: ["Users"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/SigninRequest" }
              }
            }
          },
          responses: {
            headers: {
              "Set-Cookie": {
                schema: {
                  type: "string",
                  example: "JSESSIONID=abcde12345; Path=/; HttpOnly"
                }
              }
            },
            "201": {
              description: "User created successfully"
            },
            "409": {
              description: "User already registered"
            }
          }
        }
      },
      "/api/v1/users/login": {
        post: {
          summary: "User Login",
          tags: ["Users"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/LoginRequest" }
              }
            }
          },
          responses: {
            headers: {
              "Set-Cookie": {
                schema: {
                  type: "string",
                  example: "JSESSIONID=abcde12345; Path=/; HttpOnly"
                }
              }
            },
            "200": {
              description: "Successfully authenticated"
            },
            "401": {
              description: "Authentication failed"
            }
          }
        }
      },
      "/api/v1/users": {
        get: {
          summary: "Get Users",
          tags: ["Users"],
          security: [
            {
              CookieAuth: []
            }
          ],
          parameters: [
            {
              name: "limit",
              in: "query",
              schema: {
                type: "integer"
              }
            },
            {
              name: "offset",
              in: "query",
              schema: {
                type: "integer"
              }
            },
            {
              name: "sort",
              in: "query",
              schema: {
                type: "string"
              }
            },
            {
              name: "name",
              in: "query",
              schema: {
                type: "string"
              }
            },
            {
              name: "surname",
              in: "query",
              schema: {
                type: "string"
              }
            },
            {
              name: "type",
              in: "query",
              schema: {
                type: "string",
                enum: ["mentor", "mentee"]
              }
            }
          ],
          responses: {
            "200": {
              description: "List of users",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      count: { type: "integer" },
                      rows: {
                        type: "array",
                        items: { $ref: "#/components/schemas/User" }
                      }
                    }
                  }
                }
              },
              examples: {
                example: {
                  summary: "An example response",
                  value: {
                    count: 5,
                    rows: [
                      {
                        id: 2,
                        name: "Vardan",
                        surname: "Sargsyan",
                        type: "mentee",
                        description: "Junior Developer",
                        about: "Where is my mentor Suren :D",
                        createdAt: "2024-06-22T11:24:49.622Z",
                        updatedAt: "2024-06-22T11:24:49.622Z"
                      },
                      {
                        id: 3,
                        name: "Armen",
                        surname: "Armenyan",
                        type: "mentee",
                        description: "Senior Developer",
                        about: "I want to pass interview :D",
                        createdAt: "2024-06-22T11:24:49.622Z",
                        updatedAt: "2024-06-22T16:39:14.880Z"
                      },
                      {
                        id: 4,
                        name: "Vlad",
                        surname: "Mantashyan",
                        type: "mentor",
                        description: "Musician",
                        about: "I want to pass interview :D",
                        createdAt: "2024-06-22T11:24:49.622Z",
                        updatedAt: "2024-06-22T16:39:14.880Z"
                      },
                      {
                        id: 5,
                        name: "Harut",
                        surname: "Minasyan",
                        type: "mentee",
                        description: "Senior Developer",
                        about: "I want to pass interview :D",
                        createdAt: "2024-06-22T11:24:49.622Z",
                        updatedAt: "2024-06-22T16:39:14.880Z"
                      }
                    ]
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/users/me": {
        get: {
          summary: "Get My Profile",
          tags: ["Users"],
          security: [
            {
              CookieAuth: []
            }
          ],
          responses: {
            "200": {
              description: "User profile",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/User" }
                }
              },
              examples: {
                example: {
                  summary: "An example response",
                  value: {
                    email: "suren.aghasaryan@gmail.com",
                    info: {
                      name: "Suren",
                      surname: "Aghasaryan upd",
                      type: "mentor",
                      description: "Senior Developer",
                      about: "I want to pass interview :D",
                      position: {
                        title: "Architect"
                      }
                    },
                    educations: [
                      {
                        id: 1,
                        startDate: "2016-09-01T00:00:00.000Z",
                        endDate: "2020-06-01T00:00:00.000Z",
                        institutionTitle: "Armenian Politechnical University"
                      }
                    ],
                    experiences: [
                      {
                        id: 1,
                        startDate: "2018-07-01T00:00:00.000Z",
                        endDate: "2020-07-01T00:00:00.000Z",
                        companyName: "Priotix"
                      },
                      {
                        id: 2,
                        startDate: "2020-07-01T00:00:00.000Z",
                        endDate: "2022-07-01T00:00:00.000Z",
                        companyName: "HackTech"
                      },
                      {
                        id: 4,
                        startDate: "2023-12-15T00:00:00.000Z",
                        endDate: "2025-11-11T00:00:00.000Z",
                        companyName: "Simply"
                      }
                    ],
                    fields: [
                      {
                        id: 1,
                        name: "Engineering"
                      },
                      {
                        id: 3,
                        name: "Musician"
                      }
                    ]
                  }
                }
              }
            },
            "404": {
              description: "User not found"
            }
          }
        },
        patch: {
          summary: "Update My Profile",
          tags: ["Users"],
          security: [
            {
              CookieAuth: []
            }
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/UpdateProfileRequest" }
              }
            }
          },
          responses: {
            "200": {
              description: "User profile updated successfully",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/User" }
                }
              },
              examples: {
                example: {
                  summary: "An example response",
                  value: {
                    data: {
                      email: "suren.aghasaryan@gmail.com",
                      info: {
                        name: "Poghos",
                        surname: "Poghosyan",
                        type: "mentee",
                        description: "Junior Developer",
                        about: "Where is my mentor Suren :D",
                        position: {
                          title: "Junior Developer"
                        }
                      },
                      educations: [
                        {
                          id: 2,
                          startDate: "2012-09-01T00:00:00.000Z",
                          endDate: "2016-06-01T00:00:00.000Z",
                          institutionTitle: "Yerevan State University"
                        }
                      ],
                      experiences: [
                        {
                          id: 3,
                          startDate: "2017-08-01T00:00:00.000Z",
                          endDate: "2021-08-01T00:00:00.000Z",
                          companyName: "Google"
                        }
                      ],
                      fields: [
                        {
                          id: 1,
                          name: "Engineering"
                        }
                      ]
                    }
                  }
                }
              }
            },
            "500": {
              description: "Internal Server Error"
            }
          }
        }
      },
      "/api/v1/users/{id}": {
        get: {
          summary: "Get Single User",
          tags: ["Users"],
          security: [
            {
              CookieAuth: []
            }
          ],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "integer"
              }
            }
          ],
          responses: {
            "200": {
              description: "User profile",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/User" }
                }
              }
            },
            "404": {
              description: "User not found"
            }
          }
        }
      },
      "/api/v1/users/me/educations": {
        post: {
          summary: "Add Education",
          tags: ["Users"],
          security: [
            {
              CookieAuth: []
            }
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Education" }
              }
            }
          },
          responses: {
            "201": {
              description: "Education added successfully"
            },
            "400": {
              description: "Adding education failed"
            }
          }
        }
      },
      "/api/v1/users/me/educations/{id}": {
        delete: {
          summary: "Delete Education",
          tags: ["Users"],
          security: [
            {
              CookieAuth: []
            }
          ],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "integer"
              }
            }
          ],
          responses: {
            "201": {
              description: "Education removed successfully"
            },
            "400": {
              description: "Education removing failed"
            }
          }
        }
      },
      "/api/v1/users/me/experiences": {
        post: {
          summary: "Add Experience",
          tags: ["Users"],
          security: [
            {
              CookieAuth: []
            }
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Experience" }
              }
            }
          },
          responses: {
            "201": {
              description: "Experience added successfully"
            },
            "400": {
              description: "Adding experience failed"
            }
          }
        }
      },
      "/api/v1/users/me/experiences/{id}": {
        delete: {
          summary: "Delete Experience",
          tags: ["Users"],
          security: [
            {
              CookieAuth: []
            }
          ],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: {
                type: "integer"
              }
            }
          ],
          responses: {
            "201": {
              description: "Experience removed successfully"
            },
            "400": {
              description: "Experience removing failed"
            }
          }
        }
      },
      "/api/v1/users/me/position": {
        post: {
          summary: "Attach Position",
          tags: ["Users"],
          security: [
            {
              CookieAuth: []
            }
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/AttachPositionRequest" }
              }
            }
          },
          responses: {
            "200": {
              description: "Position attached successfully"
            },
            "400": {
              description: "Position attaching failed"
            }
          }
        }
      },
      "/api/v1/users/me/field": {
        put: {
          summary: "Attach Fields",
          tags: ["Users"],
          security: [
            {
              CookieAuth: []
            }
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/AttachFieldsRequest" }
              }
            }
          },
          responses: {
            "200": {
              description: "Fields attached successfully"
            },
            "500": {
              description: "Fields attaching failed"
            }
          }
        }
      },
      "/api/v1/fields": {
        get: {
          summary: "Get Fields",
          tags: ["Fields"],
          parameters: [
            {
              name: "limit",
              in: "query",
              schema: {
                type: "integer"
              }
            },
            {
              name: "offset",
              in: "query",
              schema: {
                type: "integer"
              }
            },
            {
              name: "name",
              in: "query",
              schema: {
                type: "string"
              }
            }
          ],
          responses: {
            "200": {
              description: "List of fields",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      count: { type: "integer" },
                      rows: {
                        type: "array",
                        items: { $ref: "#/components/schemas/Field" }
                      }
                    }
                  }
                }
              }
            },
            "500": {
              description: "Error while getting fields"
            }
          }
        }
      }
    }
  },
  apis: ['./app/routes/**/*.js', './app/controllers/**/*.js', './app/models/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
