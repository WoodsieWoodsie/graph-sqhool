import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLBoolean
} from 'graphql';

let instructors = [
  {id: 1, firstName: "Henry", lastName: "Fonda", age: "97", gender: "male"},
  {id: 2, firstName: "Janet", lastName: "Beauregard", age: "43", gender: "female"},
  {id: 3, firstName: "Jim", lastName: "Cricket", age: "32", gender: "male"},
  {id: 4, firstName: "Sandra", lastName: "Wilde", age: "52", gender: "female"}
];

let students = [
  {id: 1, firstName: "Nicole", lastName: "Blair", age: "22", gender: "female", level: "senior"},
  {id: 2, firstName: "William", lastName: "Schneider", age: "20", gender: "male", level: "sophomore"},
  {id: 3, firstName: "Gordon", lastName: "Parkinson", age: "19", gender: "male", level: "freshman"},
  {id: 4, firstName: "Leslie", lastName: "Jack", age: "21", gender: "female", level: "junior"}
];

let courses = [
  {id: 1, name: "Intro to Biology", instructor: { type: instructorType, id: 2, firstName: "Janet", lastName: "Beauregard", age: "43", gender: "female" } },
  {id: 2, name: "Game Design", instructor: { type: instructorType, id: 4, firstName: "Sandra", lastName: "Wilde", age: "52", gender: "female" } },
  {id: 3, name: "Typography II", instructor: { type: instructorType, id: 1, firstName: "Henry", lastName: "Fonda", age: "97", gender: "male" } },
  {id: 4, name: "Film Studies", instructor: { type: instructorType, id: 3, firstName: "Jim", lastName: "Cricket", age: "32", gender: "male" } }
];


let instructorType = new GraphQLObjectType({
  name: 'Instructor',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    firstName: {type: GraphQLString},
    lastName: {type: GraphQLString},
    age: {type: GraphQLInt},
    gender: {type: GraphQLString}
  })
});

let studentType = new GraphQLObjectType({
  name: 'Student',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    firstName: {
      type: GraphQLString,
    },
    lastName: {type: GraphQLString},
    age: {type: GraphQLInt},
    gender: {type: GraphQLString},
    level: {type: GraphQLString}
  })
});

let courseType = new GraphQLObjectType({
  name: 'Course',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: {type: GraphQLString},
    instructor: {type: instructorType},
  })
});

let gradeType = new GraphQLObjectType({
  name: 'Grade',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    grade: {type: GraphQLString},
    instructor: {type: instructorType},
    student: {type: studentType},
  })
});

let schema = new GraphQLSchema({
  // top level fields
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      allStudents: {
        type: new GraphQLList(studentType),
        args: {
        filter: { type: GraphQLString }
      },
      resolve: (obj, {filter}) => filter ? obj.firstName : students
      },
      allInstructors: {
        type: new GraphQLList(instructorType),
        resolve: () => instructors
      },
      allCourses: {
        type: new GraphQLList(courseType),
        resolve: () => courses
      },
    })
  })

  // mutation: new GraphQLObjectType({
  //   name: 'Mutation',
  //   fields: () => ({
  //     incrementCounter: {
  //       type: GraphQLInt,
  //       args: {
  //         delta: {type: GraphQLInt}
  //       },
  //       resolve: (_, {delta}) => {
  //         counter = counter + delta;
  //         return counter;
  //       }
  //     },
  //     createLink: {
  //       type: linkType,
  //       args: {
  //         title: {type: GraphQLString},
  //         url: {type: GraphQLString},
  //       },
  //       resolve: (_, {title, url}) => {
  //         let newLink = {title, url, id: Date.now()};
  //         links.push(newLink);
  //         return newLink;
  //       }
  //     }
  //   })
  // })
});

export default schema;