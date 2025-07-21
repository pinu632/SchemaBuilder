

const nestedObject = {
    app: {
      name: "NotesVault",
      version: "1.0.0",
      meta: {
        createdBy: {
          name: "Pinu Adarsh",
          contact: {
            email: "pinu@example.com",
            phone: {
              countryCode: "+91",
              number: 9876543210
            }
          }
        },
        contributors: [
          {
            name: "Dev1",
            role: "Frontend",
            stack: {
              primary: ["React", "Tailwind"],
              secondary: ["Redux", "Framer Motion"]
            }
          },
          {
            name: "Dev2",
            role: "Backend",
            stack: {
              primary: ["Node.js", "MongoDB"],
              devOps: {
                ci: "GitHub Actions",
                container: {
                  used: true,
                  type: "Docker",
                  orchestration: {
                    k8s: true,
                    region: {
                      cloud: "AWS",
                      zones: ["ap-south-1a", "ap-south-1b"]
                    }
                  }
                }
              }
            }
          }
        ]
      }
    },
    settings: {
      auth: {
        jwt: {
          secret: "yourSecretKey",
          expiresIn: "2h",
          refreshToken: {
            enabled: true,
            ttl: "7d"
          }
        }
      },
      ui: {
        theme: {
          mode: "dark",
          customization: {
            color: {
              primary: "#4F46E5",
              secondary: "#F43F5E"
            },
            layout: {
              type: "grid",
              breakpoints: {
                sm: "640px",
                md: "768px",
                lg: "1024px"
              }
            }
          }
        }
      }
    }
  };
  

  export default nestedObject;