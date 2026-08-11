const fs = require('fs');
const file = 'src/pages/CourseDetail.tsx';
let content = fs.readFileSync(file, 'utf8');

const heroStart = content.indexOf('{/* Hero Section */}');
const courseContentStart = content.indexOf('{/* Course Content */}');
const formStart = content.indexOf('{/* ============ ENROLMENT FORM ============ */}');
const ctaStart = content.indexOf('{/* CTA Section */}');

if (heroStart === -1 || courseContentStart === -1 || formStart === -1 || ctaStart === -1) {
    console.error("Could not find one of the sections.");
    process.exit(1);
}

const beforeHero = content.substring(0, heroStart);
const heroSection = content.substring(heroStart, courseContentStart);
const courseContentSection = content.substring(courseContentStart, formStart);
const formSection = content.substring(formStart, ctaStart);
const afterCta = content.substring(ctaStart);

const newContent = beforeHero + heroSection + formSection + courseContentSection + afterCta;
fs.writeFileSync(file, newContent);
console.log("Reordered successfully");
