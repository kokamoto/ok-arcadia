import { faker } from '@faker-js/faker';

const max = 100;
const type = 'freestyle'
const recognizedDivisions = ['Cadet', 'Junior'];
const freestyleDivisions = ['17 & Under Freestyle', '18 & Over Freestyle'];


function generateCompetitor() {
  const competitor = {};
  competitor.gender = faker.name.gender(true);
  competitor.firstname = faker.name.firstName(competitor.gender);
  competitor.lastname = faker.name.lastName();
  competitor.name = `${competitor.firstname} ${competitor.lastname}`;
  competitor.belt = "Black";
  if (type === 'recongnized') {
    competitor.division = faker.random.arrayElement(recognizedDivisions);
  } else {
    competitor.division = faker.random.arrayElement(freestyleDivisions);
  }
  
  competitor.totalpoints = faker.datatype.number({ min: 20, max: 2000 });
  return competitor;
}

const competitors = [];
for (let i=0; i < max; i++) {
  competitors.push(generateCompetitor());
}

console.log(JSON.stringify(competitors));