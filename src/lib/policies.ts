// Website policies (backlog W05), from "WAF-website-policies-draft-v1.docx" (6 Nov 2026).
// Known facts are filled in. Anything still to confirm is marked {{TBC: ...}} and shows
// highlighted on the page. Have a lawyer or CA review before going live.

import { CONTACT, REGISTRATION } from "@/lib/site-config";

export const POLICY_UPDATED = "9 November 2026";

const ADDRESS = `${CONTACT.address.line1}, ${CONTACT.address.line2}, ${CONTACT.address.region}`;

export const PRIVACY_POLICY = `
Wild Agile Foundation ("we", "us") is a non-profit organization based in Nagpur, Maharashtra, India, registered under Section 12A of the Income Tax Act (registration no. ${REGISTRATION.section12A.number}; PAN ${REGISTRATION.pan}). This policy explains what personal information we collect through www.wildagile.com and at our programs, why, and what choices you have. We follow India's Digital Personal Data Protection Act, 2023.

## What we collect

- **Donors:** name, email, phone, PAN (only if you want a tax receipt), address, amount, date and payment reference. We never see or store your card or bank login details; payments run through your bank or UPI app.
- **Volunteers and partners:** name, email, phone, organization, and what you tell us about your interest and skills.
- **Schools and organisers:** school or organization name, contact person, email, phone, class and student numbers.
- **Newsletter subscribers:** email address.
- **Website visitors:** basic technical data such as pages viewed, device, browser and approximate location (including city where available), collected via Google Analytics 4 and our hosting provider's logs. We use this only to understand how the website is used. We do not use it to identify you personally.
- **Photos and videos** taken at programs (see "Photos" below and our [Child Safeguarding and Photo Consent Policy](/child-safeguarding)).

## Children's information

Our website is for adults. We do not ask children to fill in forms or create accounts. Student details (such as class strength) come from schools and parents. We do not track children's behavior, show them advertising, or collect their personal data beyond what a school or parent gives us for a program. For anyone under 18, we rely on a parent, guardian or the school's authorised person to give consent.

## Why we use it

- To process donations and send receipts and acknowledgements.
- To run programs, schedule visits and keep participants safe.
- To reply to enquiries and volunteer applications.
- To send our newsletter, only if you subscribed and confirmed. Every email has an unsubscribe link.
- To report to donors, partners, auditors and government authorities when the law requires it.
- To understand how the website is used and improve it.

We use your information only for these purposes and only with your consent or where the law allows. We do not sell personal data.

## Who we share it with

- Service providers that help us run the website and operations: Cloudflare (website hosting), Google Analytics (website usage statistics), Brevo (newsletter emails), Google Workspace (email and documents), and WhatsApp (messages you send us). They may process data only on our instructions.
- Our auditors and tax advisers, and government authorities where required by law (for example, donor details for income-tax filings).
- Partner schools and government departments, only the program details they need (for example, student counts), never for marketing.

## How long we keep it

- Donation and tax records: for the period required by Indian tax and charity law {{TBC: confirm with CA, commonly 8 years}}.
- Volunteer and enquiry records: 2 years after our last contact, then deleted.
- Newsletter: until you unsubscribe.
- Website logs: no longer than 14 months.

## Photos

We take photos and videos at programs to document our work and share it on our website, social media and reports. We use them with the consent of the school, parent or guardian, or the adult shown. We follow the rules in our [Child Safeguarding and Photo Consent Policy](/child-safeguarding), including not publishing children's full names with their faces.

## Your rights

You can ask us to: tell you what personal data we hold about you; correct or update it; delete it; stop sending you messages; withdraw your consent at any time; and nominate someone to exercise these rights for you if you cannot. To do so, write to the contact below. We will reply within 30 days. If you are not satisfied, you may complain to the Data Protection Board of India.

## Security

We keep data in password-protected, access-controlled accounts and limit access to the people who need it. No system is perfectly secure. If a breach affects your data, we will tell you and the authorities as the law requires.

## Cookies

The website uses only essential cookies needed for it to work. You can block cookies in your browser; the site will still work.

## Changes

If we change this policy, the new version will appear on this page with a new date.

## Contact and grievance officer

{{TBC: name}}, {{TBC: role}}
Wild Agile Foundation, ${ADDRESS}
Email: [${CONTACT.email}](mailto:${CONTACT.email})
Phone: ${CONTACT.phoneDisplay}
`;

export const TERMS = `
These terms apply when you use www.wildagile.com or donate to Wild Agile Foundation ("we", "us"). By using the website, you agree to them.

## Using the website

- The website shares information about our programs. We try to keep it accurate and current, but we do not promise it is free of errors.
- Do not misuse the site, try to break into it, or send false information through our forms.
- Content on the site (text, logos, photos, designs) belongs to Wild Agile Foundation or the people who gave it to us. You may share our posts with credit. For any other use, ask us first.
- Links to other websites are for convenience. We are not responsible for them.

## Donations

- Donations are voluntary gifts to support our work with children, nature and conservation education.
- You can donate by bank transfer or UPI (details on the [Donate page](/join)). After paying, please send us the transaction details so we can acknowledge it. Please check the account name before paying.
- Donations are generally non-refundable. If you paid twice or in error, write to us within 30 days with the payment reference and we will review it.
- Funds are used for our programs and running costs. If a specific campaign is over-funded, we will use the extra for similar work and say so.
- **Tax benefit:** Wild Agile Foundation holds provisional registration under Section 12A (no. ${REGISTRATION.section12A.number}) and provisional approval under Section 80G (no. ${REGISTRATION.section80G.number}), both valid for ${REGISTRATION.section80G.validity}. Donors who give their name, address and PAN can receive a receipt for claiming a deduction as the law allows. Tax rules change, so please check with your own adviser.
- Cash donations above the limits set by law may not qualify for deduction.

## Programs, events and volunteers

- Program dates and places can change because of weather, wildlife, safety or permissions from the Forest Department. We will try to give notice and an alternative.
- Outdoor activities carry natural risks such as uneven ground, insects and weather. Participants must follow the instructions of our team and forest officials. Children must be accompanied by the school or a responsible adult.
- Event tickets or contributions are non-refundable unless we cancel the event, in which case we will refund or offer another date.
- Volunteers must follow our [Child Safeguarding Policy](/child-safeguarding).

## Our responsibility

The website is provided "as is". To the extent the law allows, we are not liable for losses from using the website or from events beyond our control. Nothing here limits any right you have under Indian law.

## Law and disputes

These terms follow the laws of India. Courts at Nagpur, Maharashtra have jurisdiction. Please contact us first so we can try to sort things out.

## Contact

Wild Agile Foundation, ${ADDRESS}. Email: [${CONTACT.email}](mailto:${CONTACT.email}). Phone: ${CONTACT.phoneDisplay}.
`;

export const CHILD_SAFEGUARDING = `
Version 1. Approved by the trustees on {{TBC: date}}. Reviewed every year.

## Why we have this policy

Wild Agile Foundation works with school children in classrooms, forests and community spaces. Every child has the right to be safe. This policy applies to our trustees, staff, volunteers, experts, interns and anyone who works with children in our name.

## Our commitments

- We treat every child with respect and keep their safety and wellbeing first.
- We do not tolerate abuse, harassment, bullying, discrimination or neglect.
- We act on every concern, however small.
- We follow Indian law, including the Protection of Children from Sexual Offences (POCSO) Act, 2012.

## Code of conduct for everyone working with children

### Do

- Work in groups with at least two adults present. Keep activities in open, visible places.
- Work with the school's teachers present at all school programs.
- Respect personal space. Use positive, encouraging language.
- Follow the safety briefing, head counts and buddy system on every outdoor activity.
- Tell your team lead if you see anything that worries you.

### Do not

- Spend time alone with a child out of sight of others, or transport a child alone.
- Touch a child in any way that could be misread, or use physical punishment or shouting.
- Ask for or share children's phone numbers, social media accounts or home addresses, or contact them privately online.
- Use alcohol, tobacco or drugs during programs.
- Give gifts or favours to individual children.
- Take photos for personal use, or post anything about children on personal accounts.

## Choosing and preparing volunteers

- Everyone who works with children fills in a short application, shows ID, and gives at least one reference.
- New volunteers attend a briefing on this policy, sign the code of conduct, and first work alongside an experienced team member.
- A person who has been convicted of or is credibly accused of harming children will not work with us.

## Keeping children safe outdoors

- Check the site and the weather before each outing. Get the permissions needed from the Forest Department and the school.
- Carry a first-aid kit and know the nearest hospital. Keep a trained first-aider on each activity.
- Keep an adult-to-child ratio of 1 adult to 10 children or better, and take a head count at the start, midway and end.
- Brief children on wildlife, snakes, plants and water safety. Nobody approaches or feeds wildlife.
- Stay on marked paths and with the group.

## If you are worried about a child

1. Make sure the child is safe now. In an emergency, call 112.
2. Listen calmly. Do not question the child, promise secrecy, or investigate yourself.
3. Write down what you saw or heard, with date, time and place, as soon as you can.
4. Tell the Child Safeguarding Lead the same day: {{TBC: name, phone, email}}. If the concern involves the lead, tell {{TBC: second trustee}}.
5. The lead will decide next steps with the school or family and report to the police, the Child Welfare Committee or Childline 1098 where needed. Under POCSO, anyone who knows or suspects a sexual offence against a child must report it. Failing to do so is itself an offence.
6. We keep these records confidential and share them only with people who must act. We will not punish anyone who reports in good faith.

## Photos, videos and children's images

- We take photos only with consent: a signed school consent letter or a parent/guardian consent form, or the consent of an adult shown.
- We do not publish a child's full name, home address, phone number or school name together with their picture. First names only, and only if really needed.
- We do not publish photos that show a child in distress, undressed, injured, or in a position that could embarrass them.
- Only the foundation's official team takes photos, on foundation-approved devices or accounts. Volunteers do not take or post their own photos of children.
- Photos are stored in a restricted folder. We share them with partners only for reporting.
- If you want a photo removed, write to [${CONTACT.email}](mailto:${CONTACT.email}). We will take it down from our website and social media within 7 days and stop using it in new material. We cannot recall printed material already distributed.

## Consent forms

Schools and parents can ask us for our parent/guardian photo and participation consent form and our school consent letter template. Write to [${CONTACT.email}](mailto:${CONTACT.email}).

## Looking after this policy

The trustees are responsible for this policy. {{TBC: name}} is the Child Safeguarding Lead. The policy is reviewed once a year and after any incident.
`;
