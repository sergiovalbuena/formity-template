import type { Schema } from "formity";

const totalSteps = 4;

const schema: Schema = [
  {
    form: {
      defaultValues: {
        name: ["", []],
        surname: ["", []],
        phone: ["", []],
        email: ["", []],
      },
      resolver: {
        name: [
          [{ "#$ne": ["#$name", ""] }, "Required"],
          [{ "#$lt": [{ "#$strLen": "#$name" }, 20] }, "Max 20 chars"],
        ],
        surname: [
          [{ "#$ne": ["#$surname", ""] }, "Required"],
          [{ "#$lt": [{ "#$strLen": "#$surname" }, 20] }, "Max 20 chars"],
        ],
        phone: [
          [{ "#$ne": ["#$phone", ""] }, "Required"],
          // [{ "#$gte": ["#$phone", 10] }, "You must be at least 10 years old"],
          // [{ "#$lte": ["#$phone", 100] }, "You must be at most 100 years old"],
        ],
        email: [[{ "#$ne": ["#$email", ""] }, "Required"]],
      },
      render: {
        screen: {
          progress: { total: totalSteps, current: 1 },
          children: {
            form: {
              step: "$step",
              defaultValues: "$defaultValues",
              resolver: "$resolver",
              onNext: "$onNext",
              children: {
                formLayout: {
                  heading: "Tell us about yourself",
                  description:
                    "We would want to know a little bit more about you",
                  fields: [
                    {
                      row: {
                        items: [
                          { textField: { name: "name", label: "Name" } },
                          { textField: { name: "surname", label: "Surname" } },
                        ],
                      },
                    },

                    { numberField: { name: "phone", label: "Phone" } },
                    { textField: { name: "email", label: "Email" } },
                  ],
                  button: { next: { text: "Next" } },
                },
              },
            },
          },
        },
      },
    },
  },
  {
    form: {
      defaultValues: {
        eventName: ["", []],
        eventDate: ["", []],
        location: ["", []],
        numberOfPeople: ["", []],
      },
      resolver: {
        eventName: [
          [{ "#$ne": ["#$eventName", ""] }, "Required"],
          [{ "#$lt": [{ "#$strLen": "#$eventName" }, 50] }, "Max 50 chars"],
        ],
        eventDate: [
          [{ "#$ne": ["#$eventDate", ""] }, "Required"],
          // [
          //   {
          //     "#$regexMatch": {
          //       input: { "#$toString": "#$eventDate" },
          //       // regex: /^\d{4}-\d{2}-\d{2}$/,
          //     },
          //   },
          //   "Invalid date format (YYYY-MM-DD)",
          // ],
        ],
        location: [
          [{ "#$ne": ["#$location", ""] }, "Required"],
          [{ "#$lt": [{ "#$strLen": "#$location" }, 100] }, "Max 100 chars"],
        ],
        numberOfPeople: [
          [{ "#$ne": ["#$numberOfPeople", ""] }, "Required"],
          [{ "#$gte": ["#$numberOfPeople", 1] }, "At least 1 person required"],
        ],
      },
      render: {
        screen: {
          progress: { total: totalSteps, current: 2 },
          children: {
            form: {
              step: "$step",
              defaultValues: "$defaultValues",
              resolver: "$resolver",
              onNext: "$onNext",
              children: {
                formLayout: {
                  heading: "Event Details",
                  description: "Please provide the details of your event",
                  fields: [
                    {
                      textField: {
                        name: "eventName",
                        label: "nombre del evento",
                      },
                    },
                    {
                      textField: {
                        name: "eventDate",
                        label: "events date",
                        // type: "date",
                      },
                    },
                    {
                      textField: {
                        name: "location",
                        label: "Location",
                      },
                    },
                    {
                      numberField: {
                        name: "numberOfPeople",
                        label: "expected number of people",
                      },
                    },
                  ],
                  button: {
                    next: { text: "Next" },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  {
    form: {
      defaultValues: { softwareDeveloper: [true, []] },
      resolver: {},
      render: {
        screen: {
          progress: { total: totalSteps, current: 3 },
          children: {
            form: {
              step: "$step",
              defaultValues: "$defaultValues",
              resolver: "$resolver",
              onNext: "$onNext",
              children: {
                formLayout: {
                  heading: "Are you a software developer?",
                  description:
                    "We would like to know if you are a software developer",
                  fields: [
                    {
                      yesNo: {
                        name: "softwareDeveloper",
                        label: "Software Developer",
                      },
                    },
                  ],
                  button: { next: { text: "Next" } },
                  back: { back: { onBack: "$onBack" } },
                },
              },
            },
          },
        },
      },
    },
  },

  {
    cond: {
      if: { $eq: ["$softwareDeveloper", true] },
      then: [
        {
          variables: {
            languagesOptions: [
              { value: "javascript", label: "JavaScript" },
              { value: "python", label: "Python" },
              { value: "go", label: "Go" },
            ],
            questions: {
              javascript:
                "What rating would you give to the JavaScript language?",
              python: "What rating would you give to the Python language?",
              go: "What rating would you give to the Go language?",
            },
          },
        },
        {
          form: {
            defaultValues: {
              languages: [[], []],
            },
            resolver: {},
            render: {
              screen: {
                progress: { total: totalSteps, current: 4 },
                children: {
                  form: {
                    step: "$step",
                    defaultValues: "$defaultValues",
                    resolver: "$resolver",
                    onNext: "$onNext",
                    children: {
                      formLayout: {
                        heading:
                          "What are your favourite programming languages?",
                        description:
                          "We would like to know which of the following programming languages you like the most",
                        fields: [
                          {
                            multiSelect: {
                              name: "languages",
                              label: "Languages",
                              options: "$languagesOptions",
                              direction: "y",
                            },
                          },
                        ],
                        button: {
                          next: { text: "Next" },
                        },
                        back: {
                          back: { onBack: "$onBack" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        {
          variables: {
            i: 0,
            languagesRatings: [],
          },
        },
        {
          loop: {
            while: { $lt: ["$i", { $size: "$languages" }] },
            do: [
              {
                variables: {
                  language: { $arrayElemAt: ["$languages", "$i"] },
                },
              },
              {
                variables: {
                  question: {
                    $getField: { field: "$language", input: "$questions" },
                  },
                },
              },
              {
                form: {
                  defaultValues: {
                    rating: ["love-it", ["$language"]],
                  },
                  resolver: {},
                  render: {
                    screen: {
                      progress: {
                        total: { $add: [3, { $size: "$languages" }] },
                        current: { $add: [4, "$i"] },
                      },
                      children: {
                        form: {
                          step: "$step",
                          defaultValues: "$defaultValues",
                          resolver: "$resolver",
                          onNext: "$onNext",
                          children: {
                            formLayout: {
                              heading: "$question",
                              description:
                                "Since you said it is one of your favourite languages, we would like to know how much you like it",
                              fields: [
                                {
                                  select: {
                                    name: "rating",
                                    label: "Rating",
                                    options: [
                                      {
                                        value: "love-it",
                                        label: "Love it",
                                      },
                                      {
                                        value: "like-it-a-lot",
                                        label: "Like it a lot",
                                      },
                                      {
                                        value: "it-is-okay",
                                        label: "It's okay",
                                      },
                                    ],
                                    direction: "y",
                                  },
                                },
                              ],
                              button: {
                                next: { text: "Next" },
                              },
                              back: {
                                back: { onBack: "$onBack" },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
              {
                variables: {
                  i: { $add: ["$i", 1] },
                  languagesRatings: {
                    $concatArrays: [
                      "$languagesRatings",
                      [{ name: "$language", rating: "$rating" }],
                    ],
                  },
                },
              },
            ],
          },
        },
        {
          return: {
            fullName: { $concat: ["$name", " ", "$surname"] },
            age: "$age",
            softwareDeveloper: "$softwareDeveloper",
            languages: "$languagesRatings",
          },
        },
      ],
      else: [
        {
          form: {
            defaultValues: {
              interested: ["maybe", []],
            },
            resolver: {},
            render: {
              screen: {
                progress: { total: totalSteps, current: 4 },
                children: {
                  form: {
                    step: "$step",
                    defaultValues: "$defaultValues",
                    resolver: "$resolver",
                    onNext: "$onNext",
                    children: {
                      formLayout: {
                        heading:
                          "Would you be interested in learning how to code?",
                        description:
                          "Having coding skills can be very beneficial",
                        fields: [
                          {
                            listbox: {
                              name: "interested",
                              label: "Interested",
                              options: [
                                {
                                  value: "maybe",
                                  label: "Maybe in another time.",
                                },
                                {
                                  value: "yes",
                                  label: "Yes, that sounds good.",
                                },
                                { value: "no", label: "No, it is not for me." },
                              ],
                            },
                          },
                        ],
                        button: {
                          next: { text: "Next" },
                        },
                        back: {
                          back: { onBack: "$onBack" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        {
          return: {
            fullName: { $concat: ["$name", " ", "$surname"] },
            age: "$age",
            softwareDeveloper: "$softwareDeveloper",
            interested: "$interested",
          },
        },
      ],
    },
  },
];

export default schema;
