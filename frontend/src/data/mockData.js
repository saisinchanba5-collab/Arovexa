/**
 * AROVEXA Central Structured Mock Data
 * All healthcare values, doctor profiles, and hospital listings are explicitly
 * labeled as DEMO DATA / SAMPLE PREVIEW for Step 2 UI Prototype.
 */

export const SAMPLE_HOSPITALS = [
  {
    id: 'HOSP-01',
    name: 'Apollo Hospitals & Health City',
    type: 'Multi-Specialty Hospital',
    city: 'Metro City',
    location: '45 Health Avenue, Sector 5, Metro City',
    phone: '+1 (555) 019-2831',
    rating: 4.9,
    reviewsCount: 480,
    beds: '550+ Beds',
    emergency: true,
    status: '24/7 Trauma Care',
    accreditation: 'JCI & NABH Accredited',
    facilities: ['Emergency', 'Pharmacy', 'Diagnostics', '24/7 Service', 'ICU', 'Blood Bank'],
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Premier multi-specialty healthcare facility with advanced robotic surgical suites and 24/7 cardiac trauma care.',
    overview: 'Apollo Hospitals & Health City is a world-class quaternary healthcare institution offering state-of-the-art diagnostic labs, comprehensive emergency triage, and dedicated centers of excellence across cardiology, neurology, and oncology.'
  },
  {
    id: 'HOSP-02',
    name: 'St. Jude Metropolitan Medical Center',
    type: 'Tertiary Care Center',
    city: 'Metro City',
    location: '124 Healthcare Boulevard, Sector 4, Metro City',
    phone: '+1 (555) 234-8901',
    rating: 4.85,
    reviewsCount: 320,
    beds: '420+ Beds',
    emergency: true,
    status: '24/7 Emergency Active',
    accreditation: 'JCI Accredited',
    facilities: ['Emergency', 'Pharmacy', 'Diagnostics', '24/7 Service', 'ICU', 'Blood Bank'],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Leading academic medical center renowned for advanced trauma recovery, orthopedics, and clinical research.',
    overview: 'St. Jude Metropolitan Medical Center delivers holistic patient-centered healthcare with specialized intensive care units, 24-hour pathology, and multi-disciplinary specialty clinics.'
  },
  {
    id: 'HOSP-03',
    name: 'Apex Cardiovascular & Neurosciences Institute',
    type: 'Super-Specialty Institute',
    city: 'Highland',
    location: '500 Highland Park Medical Corridor, Highland',
    phone: '+1 (555) 345-6789',
    rating: 4.95,
    reviewsCount: 410,
    beds: '320+ Beds',
    emergency: true,
    status: 'Cath Lab Active',
    accreditation: 'Global Heart & Stroke Accreditation',
    facilities: ['Emergency', 'Pharmacy', 'Diagnostics', '24/7 Service', 'ICU', 'Blood Bank'],
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Dedicated center of surgical excellence for complex cardiovascular interventions and advanced neurology.',
    overview: 'Apex Institute is an internationally recognized super-specialty hospital featuring cutting-edge hybrid catheterization labs, a dedicated stroke rapid response team, and advanced neuro-navigation equipment.'
  },
  {
    id: 'HOSP-04',
    name: 'Horizon Maternal & Child Health Hospital',
    type: 'Specialized Women & Children',
    city: 'Westside',
    location: '88 Children Way, Suite 200, Westside',
    phone: '+1 (555) 890-1234',
    rating: 4.8,
    reviewsCount: 260,
    beds: '200+ Beds',
    emergency: true,
    status: 'Pediatric ER Active',
    accreditation: 'NABH Accredited',
    facilities: ['Emergency', 'Pharmacy', 'Diagnostics', '24/7 Service', 'ICU', 'Blood Bank'],
    image: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Specialized healthcare hospital dedicated to obstetrics, neonatal intensive care, and adolescent medicine.',
    overview: 'Horizon Maternal & Child Health Hospital combines gentle maternal care with Level-III Neonatal Intensive Care Units (NICU) and compassionate pediatric surgical specialists.'
  },
  {
    id: 'HOSP-05',
    name: 'Greenfield Community Health & Diagnostics',
    type: 'Community Health Clinic',
    city: 'Metro City',
    location: '12 Greenfield Avenue, Block B, Metro City',
    phone: '+1 (555) 678-9012',
    rating: 4.7,
    reviewsCount: 145,
    beds: '80 Beds',
    emergency: true,
    status: 'OPD & Urgent Care Open',
    accreditation: 'State Healthcare Board Certified',
    facilities: ['Emergency', 'Pharmacy', 'Diagnostics', '24/7 Service', 'ICU', 'Blood Bank'],
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    shortDescription: 'Accessible community healthcare facility providing preventative checkups, diagnostics, and family medicine.',
    overview: 'Greenfield Community Health offers prompt outpatient consultations, comprehensive family medicine, vaccination drives, and affordable diagnostic pathology screening.'
  }
];

// Exactly 5 hospitals x 5 doctors each = 25 sample doctors total
export const SAMPLE_DOCTORS = [
  // Hospital 1: Apollo Hospitals & Health City (Doctors 1 to 5)
  {
    id: 'DOC-01',
    name: 'Dr. Priya Sharma, MD',
    specialty: 'Cardiology',
    experience: '14+ Years Experience',
    hospitalId: 'HOSP-01',
    hospitalName: 'Apollo Hospitals & Health City',
    consultationFee: '$85',
    rating: 4.95,
    reviewsCount: 214,
    availability: 'Available Today • 4:00 PM',
    gender: 'Female',
    consultationType: ['In-Person', 'Telehealth'],
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    education: 'MBBS, MD - Cardiology (AIIMS), FACC',
    about: 'Dr. Priya Sharma is a senior consultant cardiologist specializing in non-invasive coronary imaging, preventive hypertension management, and echocardiography.',
    availableSlots: ['Today 4:00 PM', 'Tomorrow 11:00 AM', 'Friday 3:30 PM']
  },
  {
    id: 'DOC-02',
    name: 'Dr. Rajesh Iyer, MS, MCh',
    specialty: 'Orthopedics',
    experience: '18+ Years Experience',
    hospitalId: 'HOSP-01',
    hospitalName: 'Apollo Hospitals & Health City',
    consultationFee: '$95',
    rating: 4.9,
    reviewsCount: 180,
    availability: 'Next Slot: Tomorrow • 10:00 AM',
    gender: 'Male',
    consultationType: ['In-Person'],
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    education: 'MBBS, MS - Orthopedics, Fellowship in Joint Replacement',
    about: 'Expert orthopedic surgeon with over 1,500 successful joint replacements and arthroscopic sports ligament reconstructions.',
    availableSlots: ['Tomorrow 10:00 AM', 'Tomorrow 2:00 PM', 'Thursday 11:30 AM']
  },
  {
    id: 'DOC-03',
    name: 'Dr. Ananya Roy, MD',
    specialty: 'Neurology',
    experience: '11+ Years Experience',
    hospitalId: 'HOSP-01',
    hospitalName: 'Apollo Hospitals & Health City',
    consultationFee: '$90',
    rating: 4.88,
    reviewsCount: 135,
    availability: 'Available Today • 5:30 PM',
    gender: 'Female',
    consultationType: ['In-Person', 'Telehealth'],
    image: 'https://images.unsplash.com/photo-1594824813571-638f02634417?auto=format&fit=crop&w=600&q=80',
    education: 'MBBS, MD - Medicine, DM - Neurology',
    about: 'Clinical neurologist specializing in epilepsy syndromes, migraine management, and peripheral neuromuscular diagnostics.',
    availableSlots: ['Today 5:30 PM', 'Wednesday 10:00 AM', 'Friday 4:00 PM']
  },
  {
    id: 'DOC-04',
    name: 'Dr. David Chen, MD',
    specialty: 'Pediatrics',
    experience: '13+ Years Experience',
    hospitalId: 'HOSP-01',
    hospitalName: 'Apollo Hospitals & Health City',
    consultationFee: '$75',
    rating: 4.86,
    reviewsCount: 160,
    availability: 'Available Tomorrow • 9:00 AM',
    gender: 'Male',
    consultationType: ['In-Person', 'Telehealth'],
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    education: 'MD - Pediatrics, Board Certified Pediatrician',
    about: 'Caring pediatrician focused on newborn wellness, pediatric developmental milestones, and childhood immunization strategies.',
    availableSlots: ['Tomorrow 9:00 AM', 'Thursday 1:00 PM', 'Friday 10:30 AM']
  },
  {
    id: 'DOC-05',
    name: 'Dr. Sunita Deshmukh, MD',
    specialty: 'Dermatology',
    experience: '9+ Years Experience',
    hospitalId: 'HOSP-01',
    hospitalName: 'Apollo Hospitals & Health City',
    consultationFee: '$70',
    rating: 4.91,
    reviewsCount: 195,
    availability: 'Available Today • 6:00 PM',
    gender: 'Female',
    consultationType: ['In-Person', 'Telehealth'],
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    education: 'MBBS, MD - Dermatology & Venereology',
    about: 'Dermatologist with specialization in clinical allergy treatments, psoriasis management, and dermatoscopic skin screenings.',
    availableSlots: ['Today 6:00 PM', 'Wednesday 2:00 PM', 'Thursday 4:00 PM']
  },

  // Hospital 2: St. Jude Metropolitan Medical Center (Doctors 6 to 10)
  {
    id: 'DOC-06',
    name: 'Dr. Sarah Bennett, MD',
    specialty: 'Cardiology',
    experience: '16+ Years Experience',
    hospitalId: 'HOSP-02',
    hospitalName: 'St. Jude Metropolitan Medical Center',
    consultationFee: '$85',
    rating: 4.96,
    reviewsCount: 240,
    availability: 'Available Today • 3:30 PM',
    gender: 'Female',
    consultationType: ['In-Person', 'Telehealth'],
    image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=600&q=80',
    education: 'MD - Internal Medicine, Fellowship in Cardiovascular Care (Harvard)',
    about: 'Chief cardiologist at St. Jude, recognized for clinical excellence in heart failure management and lipid clinic consultations.',
    availableSlots: ['Today 3:30 PM', 'Tomorrow 10:30 AM', 'Friday 2:00 PM']
  },
  {
    id: 'DOC-07',
    name: 'Dr. Michael Chang, MS',
    specialty: 'Orthopedics',
    experience: '12+ Years Experience',
    hospitalId: 'HOSP-02',
    hospitalName: 'St. Jude Metropolitan Medical Center',
    consultationFee: '$80',
    rating: 4.87,
    reviewsCount: 142,
    availability: 'Next Slot: Thursday • 11:00 AM',
    gender: 'Male',
    consultationType: ['In-Person'],
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80',
    education: 'MS - Orthopedic Surgery, Sports Medicine Fellowship',
    about: 'Specializes in minimally invasive spine decompression, tendon repairs, and musculoskeletal ultrasound assessments.',
    availableSlots: ['Thursday 11:00 AM', 'Friday 3:00 PM', 'Monday 10:00 AM']
  },
  {
    id: 'DOC-08',
    name: 'Dr. Emily Watson, MD',
    specialty: 'Family Medicine',
    experience: '10+ Years Experience',
    hospitalId: 'HOSP-02',
    hospitalName: 'St. Jude Metropolitan Medical Center',
    consultationFee: '$65',
    rating: 4.92,
    reviewsCount: 178,
    availability: 'Available Today • 2:00 PM',
    gender: 'Female',
    consultationType: ['In-Person', 'Telehealth'],
    image: 'https://images.unsplash.com/photo-1594824813571-638f02634417?auto=format&fit=crop&w=600&q=80',
    education: 'MD - Family & Community Medicine',
    about: 'Compassionate family practitioner offering holistic annual physicals, chronic condition management, and geriatric care.',
    availableSlots: ['Today 2:00 PM', 'Tomorrow 1:30 PM', 'Wednesday 9:30 AM']
  },
  {
    id: 'DOC-09',
    name: 'Dr. Vikram Patel, MS, MCh',
    specialty: 'General Surgery',
    experience: '20+ Years Experience',
    hospitalId: 'HOSP-02',
    hospitalName: 'St. Jude Metropolitan Medical Center',
    consultationFee: '$90',
    rating: 4.94,
    reviewsCount: 310,
    availability: 'Next Slot: Wednesday • 10:00 AM',
    gender: 'Male',
    consultationType: ['In-Person'],
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    education: 'MBBS, MS, FRCS - Laparoscopic & GI Surgery',
    about: 'Pioneering gastrointestinal surgeon known for single-incision laparoscopic procedures and surgical oncology consults.',
    availableSlots: ['Wednesday 10:00 AM', 'Thursday 2:30 PM', 'Friday 11:00 AM']
  },
  {
    id: 'DOC-10',
    name: 'Dr. Kavita Nair, MD',
    specialty: 'Endocrinology',
    experience: '15+ Years Experience',
    hospitalId: 'HOSP-02',
    hospitalName: 'St. Jude Metropolitan Medical Center',
    consultationFee: '$80',
    rating: 4.89,
    reviewsCount: 165,
    availability: 'Available Friday • 11:00 AM',
    gender: 'Female',
    consultationType: ['In-Person', 'Telehealth'],
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    education: 'MD - Endocrinology, Diabetology Specialist',
    about: 'Expert in diabetes optimization, thyroid disorders, and metabolic health management through personalized clinical plans.',
    availableSlots: ['Friday 11:00 AM', 'Saturday 10:00 AM', 'Monday 3:00 PM']
  },

  // Hospital 3: Apex Cardiovascular & Neurosciences Institute (Doctors 11 to 15)
  {
    id: 'DOC-11',
    name: 'Dr. Marcus Reynolds, MS',
    specialty: 'Neurology',
    experience: '18+ Years Experience',
    hospitalId: 'HOSP-03',
    hospitalName: 'Apex Cardiovascular & Neurosciences Institute',
    consultationFee: '$100',
    rating: 4.98,
    reviewsCount: 340,
    availability: 'Next Slot: Tomorrow • 11:30 AM',
    gender: 'Male',
    consultationType: ['In-Person', 'Telehealth'],
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    education: 'MD - Neurology, Fellowship in Stroke & Neurovascular Disorders',
    about: 'Director of Neurosciences at Apex, renowned for stroke intervention, acute neurological triage, and cognitive disorder studies.',
    availableSlots: ['Tomorrow 11:30 AM', 'Thursday 10:00 AM', 'Friday 3:00 PM']
  },
  {
    id: 'DOC-12',
    name: 'Dr. Alistair Sterling, MD, DM',
    specialty: 'Cardiology',
    experience: '22+ Years Experience',
    hospitalId: 'HOSP-03',
    hospitalName: 'Apex Cardiovascular & Neurosciences Institute',
    consultationFee: '$110',
    rating: 4.97,
    reviewsCount: 420,
    availability: 'Available Today • 4:30 PM',
    gender: 'Male',
    consultationType: ['In-Person'],
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    education: 'DM - Interventional Cardiology, FACC, FSCAI',
    about: 'World-renowned interventional cardiologist performing complex angioplasties, transcatheter aortic valves, and cardiac rhythm interventions.',
    availableSlots: ['Today 4:30 PM', 'Wednesday 9:00 AM', 'Thursday 3:00 PM']
  },
  {
    id: 'DOC-13',
    name: 'Dr. Meera Nambiar, MD',
    specialty: 'Neurology',
    experience: '12+ Years Experience',
    hospitalId: 'HOSP-03',
    hospitalName: 'Apex Cardiovascular & Neurosciences Institute',
    consultationFee: '$85',
    rating: 4.89,
    reviewsCount: 155,
    availability: 'Available Wednesday • 2:00 PM',
    gender: 'Female',
    consultationType: ['In-Person', 'Telehealth'],
    image: 'https://images.unsplash.com/photo-1594824813571-638f02634417?auto=format&fit=crop&w=600&q=80',
    education: 'MD - Neurology, Specialist in Movement Disorders',
    about: 'Specialist in Parkinson disease therapeutics, deep brain stimulation monitoring, and movement pathology clinics.',
    availableSlots: ['Wednesday 2:00 PM', 'Thursday 11:00 AM', 'Friday 1:30 PM']
  },
  {
    id: 'DOC-14',
    name: 'Dr. Robert Torres, MD',
    specialty: 'Cardiothoracic Surgery',
    experience: '19+ Years Experience',
    hospitalId: 'HOSP-03',
    hospitalName: 'Apex Cardiovascular & Neurosciences Institute',
    consultationFee: '$120',
    rating: 4.95,
    reviewsCount: 280,
    availability: 'Available Thursday • 9:30 AM',
    gender: 'Male',
    consultationType: ['In-Person'],
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80',
    education: 'MD, MCh - Cardiothoracic Surgery',
    about: 'Pioneering cardiothoracic surgeon leading robotic coronary bypass programs and minimally invasive valve reconstruction.',
    availableSlots: ['Thursday 9:30 AM', 'Friday 2:00 PM', 'Monday 10:00 AM']
  },
  {
    id: 'DOC-15',
    name: 'Dr. Linda Zhao, MD',
    specialty: 'Radiology',
    experience: '14+ Years Experience',
    hospitalId: 'HOSP-03',
    hospitalName: 'Apex Cardiovascular & Neurosciences Institute',
    consultationFee: '$75',
    rating: 4.91,
    reviewsCount: 130,
    availability: 'Available Today • 1:00 PM',
    gender: 'Female',
    consultationType: ['Telehealth'],
    image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=600&q=80',
    education: 'MD - Diagnostic & Interventional Neuroradiology',
    about: 'Expert radiologist providing advanced 3T MRI interpretations, neuro-perfusion mapping, and CT angiography reports.',
    availableSlots: ['Today 1:00 PM', 'Tomorrow 3:00 PM', 'Thursday 12:00 PM']
  },

  // Hospital 4: Horizon Maternal & Child Health Hospital (Doctors 16 to 20)
  {
    id: 'DOC-16',
    name: 'Dr. Natasha Verma, MD, DGO',
    specialty: 'Obstetrics & Gynecology',
    experience: '17+ Years Experience',
    hospitalId: 'HOSP-04',
    hospitalName: 'Horizon Maternal & Child Health Hospital',
    consultationFee: '$85',
    rating: 4.96,
    reviewsCount: 310,
    availability: 'Available Today • 11:00 AM',
    gender: 'Female',
    consultationType: ['In-Person', 'Telehealth'],
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    education: 'MD, DGO, Fellowship in Fetal Medicine',
    about: 'Renowned obstetrician specializing in high-risk pregnancy monitoring, prenatal fetal ultrasound, and minimally invasive gynecology.',
    availableSlots: ['Today 11:00 AM', 'Tomorrow 2:00 PM', 'Friday 9:30 AM']
  },
  {
    id: 'DOC-17',
    name: 'Dr. Kenneth Cole, MD',
    specialty: 'Pediatrics',
    experience: '15+ Years Experience',
    hospitalId: 'HOSP-04',
    hospitalName: 'Horizon Maternal & Child Health Hospital',
    consultationFee: '$75',
    rating: 4.9,
    reviewsCount: 220,
    availability: 'Next Slot: Tomorrow • 9:30 AM',
    gender: 'Male',
    consultationType: ['In-Person', 'Telehealth'],
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    education: 'MD - Neonatology & Pediatric Critical Care',
    about: 'Lead neonatologist providing compassionate care for preterm infants, congenital screening, and childhood wellness protocols.',
    availableSlots: ['Tomorrow 9:30 AM', 'Thursday 1:00 PM', 'Friday 10:00 AM']
  },
  {
    id: 'DOC-18',
    name: 'Dr. Shalini Saxena, MD',
    specialty: 'Pediatric Neurology',
    experience: '11+ Years Experience',
    hospitalId: 'HOSP-04',
    hospitalName: 'Horizon Maternal & Child Health Hospital',
    consultationFee: '$85',
    rating: 4.88,
    reviewsCount: 140,
    availability: 'Available Wednesday • 11:30 AM',
    gender: 'Female',
    consultationType: ['In-Person', 'Telehealth'],
    image: 'https://images.unsplash.com/photo-1594824813571-638f02634417?auto=format&fit=crop&w=600&q=80',
    education: 'MD - Pediatrics, DM - Pediatric Neurology',
    about: 'Dedicated pediatric neurologist diagnosing developmental speech delays, childhood absence seizures, and neurogenetic conditions.',
    availableSlots: ['Wednesday 11:30 AM', 'Thursday 3:00 PM', 'Friday 11:00 AM']
  },
  {
    id: 'DOC-19',
    name: 'Dr. Daniel Morales, MD',
    specialty: 'Pediatric Surgery',
    experience: '13+ Years Experience',
    hospitalId: 'HOSP-04',
    hospitalName: 'Horizon Maternal & Child Health Hospital',
    consultationFee: '$95',
    rating: 4.92,
    reviewsCount: 175,
    availability: 'Available Friday • 10:00 AM',
    gender: 'Male',
    consultationType: ['In-Person'],
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    education: 'MS - General Surgery, MCh - Pediatric Surgery',
    about: 'Specialized neonatal and pediatric laparoscopic surgeon with gentle touch and surgical precision in correcting congenital anomalies.',
    availableSlots: ['Friday 10:00 AM', 'Monday 2:00 PM', 'Tuesday 11:00 AM']
  },
  {
    id: 'DOC-20',
    name: 'Dr. Sarah Jenkins, MD',
    specialty: 'Dermatology',
    experience: '8+ Years Experience',
    hospitalId: 'HOSP-04',
    hospitalName: 'Horizon Maternal & Child Health Hospital',
    consultationFee: '$70',
    rating: 4.86,
    reviewsCount: 128,
    availability: 'Available Today • 3:00 PM',
    gender: 'Female',
    consultationType: ['In-Person', 'Telehealth'],
    image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=600&q=80',
    education: 'MD - Pediatric & Adolescent Dermatology',
    about: 'Specialist in pediatric atopic dermatitis, vascular birthmarks, eczema management, and adolescent acne care.',
    availableSlots: ['Today 3:00 PM', 'Tomorrow 12:00 PM', 'Thursday 2:30 PM']
  },

  // Hospital 5: Greenfield Community Health & Diagnostics (Doctors 21 to 25)
  {
    id: 'DOC-21',
    name: 'Dr. Harish Kulkarni, MD',
    specialty: 'Family Medicine',
    experience: '21+ Years Experience',
    hospitalId: 'HOSP-05',
    hospitalName: 'Greenfield Community Health & Diagnostics',
    consultationFee: '$55',
    rating: 4.94,
    reviewsCount: 380,
    availability: 'Available Today • 10:00 AM',
    gender: 'Male',
    consultationType: ['In-Person', 'Telehealth'],
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    education: 'MD - General & Internal Medicine',
    about: 'Trusted community doctor with two decades of experience diagnosing acute fevers, respiratory infections, and managing hypertension.',
    availableSlots: ['Today 10:00 AM', 'Today 2:30 PM', 'Tomorrow 9:00 AM']
  },
  {
    id: 'DOC-22',
    name: 'Dr. Fatima Zahra, MD',
    specialty: 'Dermatology',
    experience: '10+ Years Experience',
    hospitalId: 'HOSP-05',
    hospitalName: 'Greenfield Community Health & Diagnostics',
    consultationFee: '$60',
    rating: 4.88,
    reviewsCount: 162,
    availability: 'Available Tomorrow • 11:00 AM',
    gender: 'Female',
    consultationType: ['In-Person', 'Telehealth'],
    image: 'https://images.unsplash.com/photo-1594824813571-638f02634417?auto=format&fit=crop&w=600&q=80',
    education: 'MBBS, MD - Dermatology',
    about: 'Expert in skin allergies, hair loss evaluations, fungal infections, and preventive dermatological counseling.',
    availableSlots: ['Tomorrow 11:00 AM', 'Thursday 10:30 AM', 'Friday 4:00 PM']
  },
  {
    id: 'DOC-23',
    name: 'Dr. Gregory Houseman, MD',
    specialty: 'Orthopedics',
    experience: '16+ Years Experience',
    hospitalId: 'HOSP-05',
    hospitalName: 'Greenfield Community Health & Diagnostics',
    consultationFee: '$70',
    rating: 4.87,
    reviewsCount: 190,
    availability: 'Next Slot: Wednesday • 1:00 PM',
    gender: 'Male',
    consultationType: ['In-Person'],
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80',
    education: 'MS - Orthopedic Traumatology',
    about: 'Specializes in arthritis relief, sprains, fracture management, and physical rehabilitation planning.',
    availableSlots: ['Wednesday 1:00 PM', 'Thursday 3:00 PM', 'Friday 9:00 AM']
  },
  {
    id: 'DOC-24',
    name: 'Dr. Ritu Bannerjee, MD',
    specialty: 'Cardiology',
    experience: '12+ Years Experience',
    hospitalId: 'HOSP-05',
    hospitalName: 'Greenfield Community Health & Diagnostics',
    consultationFee: '$70',
    rating: 4.9,
    reviewsCount: 148,
    availability: 'Available Today • 4:00 PM',
    gender: 'Female',
    consultationType: ['In-Person', 'Telehealth'],
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    education: 'MD - Cardiology & Lifestyle Medicine',
    about: 'Community cardiologist focused on early dyslipidemia identification, ECG analysis, and lifestyle heart wellness.',
    availableSlots: ['Today 4:00 PM', 'Tomorrow 10:00 AM', 'Friday 2:30 PM']
  },
  {
    id: 'DOC-25',
    name: 'Dr. Aaron Vance, MD',
    specialty: 'Pediatrics',
    experience: '9+ Years Experience',
    hospitalId: 'HOSP-05',
    hospitalName: 'Greenfield Community Health & Diagnostics',
    consultationFee: '$55',
    rating: 4.85,
    reviewsCount: 110,
    availability: 'Available Thursday • 10:00 AM',
    gender: 'Male',
    consultationType: ['In-Person', 'Telehealth'],
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    education: 'MD - General Pediatrics',
    about: 'Friendly neighborhood pediatrician providing gentle checkups, immunization boosters, and nutritional support.',
    availableSlots: ['Thursday 10:00 AM', 'Friday 11:30 AM', 'Saturday 9:00 AM']
  }
];

// Exactly 5 sample lab tests
export const SAMPLE_LAB_TESTS = [
  {
    id: 'LAB-01',
    name: 'Comprehensive Metabolic Panel (CMP-14)',
    category: 'Full Body Checks',
    parameters: '14 Core Parameters (Electrolytes, Blood Glucose, Kidney & Liver Function)',
    turnaround: 'Results in 18-24 Hours',
    sampleType: 'Blood Sample (Fast 8-10 hrs)',
    homeCollection: 'Free Home Sample Collection',
    price: '$45',
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=600&q=80',
    shortDescription: 'Essential annual chemical balance test assessing kidney health, liver enzymes, and electrolyte equilibrium.'
  },
  {
    id: 'LAB-02',
    name: 'Complete Blood Count (CBC) with Differential',
    category: 'Full Body Checks',
    parameters: 'Hemoglobin, RBC, WBC, Platelets, Hematocrit & Differential Count',
    turnaround: 'Results in 8-12 Hours',
    sampleType: 'Blood Sample (No fasting required)',
    homeCollection: 'Doorstep Collection Available',
    price: '$28',
    badge: 'Essential',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80',
    shortDescription: 'Evaluates overall cellular health and screens for anemia, infections, and immune vitality.'
  },
  {
    id: 'LAB-03',
    name: 'Advanced Lipid & Cardiovascular Profile',
    category: 'Cardiology',
    parameters: 'Total Cholesterol, HDL, LDL, VLDL, Triglycerides, Total/HDL Ratio',
    turnaround: 'Results in 12 Hours',
    sampleType: 'Blood Sample (10 hrs fasting)',
    homeCollection: 'Doorstep Collection Available',
    price: '$50',
    badge: 'Cardiac Focus',
    image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=600&q=80',
    shortDescription: 'Measures blood fats and cholesterol particles to gauge cardiovascular risk and arterial health.'
  },
  {
    id: 'LAB-04',
    name: 'Complete Thyroid Profile (T3, T4, TSH Ultrasensitive)',
    category: 'Thyroid',
    parameters: '3 Hormonal Biomarkers (Total T3, Total T4, TSH Ultrasensitive)',
    turnaround: 'Same Day Results',
    sampleType: 'Blood Sample (Morning sample preferred)',
    homeCollection: 'Free Home Collection',
    price: '$38',
    badge: 'Fast Result',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
    shortDescription: 'Screens thyroid gland endocrine activity to evaluate metabolic speed, energy balance, and hormonal balance.'
  },
  {
    id: 'LAB-05',
    name: 'Diabetes Glycated HbA1c & Fasting Glucose',
    category: 'Diabetes',
    parameters: 'HbA1c Average (3-month trend) + Fasting Plasma Blood Sugar',
    turnaround: 'Results in 12 Hours',
    sampleType: 'Blood Sample (8-10 hrs fasting)',
    homeCollection: 'Doorstep Collection Available',
    price: '$35',
    badge: 'Standard Care',
    image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&w=600&q=80',
    shortDescription: 'Gold standard screening for prediabetes, insulin sensitivity, and long-term glycemic control.'
  }
];

// Health summary metrics (Soft variations per approved requirements)
export const SAMPLE_HEALTH_SUMMARY = [
  {
    id: 'METRIC-01',
    metric: 'Heart Rate',
    value: '72',
    unit: 'BPM',
    status: 'Optimal Rhythm',
    tint: 'coral', // coral tint
    trend: 'Resting normal',
    demoLabel: 'Sample Preview'
  },
  {
    id: 'METRIC-02',
    metric: 'Blood Pressure',
    value: '118/76',
    unit: 'mmHg',
    status: 'Ideal Pressure',
    tint: 'ice-blue', // ice blue
    trend: 'Systolic optimal',
    demoLabel: 'Sample Preview'
  },
  {
    id: 'METRIC-03',
    metric: 'SpO₂',
    value: '98%',
    unit: 'Saturation',
    status: 'Normal Oxygenation',
    tint: 'mint', // mint
    trend: 'Stable arterial',
    demoLabel: 'Sample Preview'
  },
  {
    id: 'METRIC-04',
    metric: 'Steps',
    value: '6,542',
    unit: 'Daily Steps',
    status: '65% of Daily Goal',
    tint: 'soft-highlight', // soft highlight
    trend: 'Active tracking',
    demoLabel: 'Sample Preview'
  }
];

// Upcoming Appointments for Dashboard Carousel 2
export const SAMPLE_UPCOMING_APPOINTMENTS = [
  {
    id: 'APT-101',
    doctor: 'Dr. Priya Sharma',
    specialty: 'Cardiologist',
    hospital: 'Apollo Hospitals',
    date: '30 Aug',
    time: '4:00 PM',
    status: 'Upcoming',
    badgeVariant: 'lime',
    demoLabel: 'Sample Preview'
  },
  {
    id: 'APT-102',
    doctor: 'Dr. Marcus Reynolds',
    specialty: 'Neurologist',
    hospital: 'Apex Cardiovascular & Neurosciences',
    date: '02 Sep',
    time: '11:30 AM',
    status: 'Confirmed',
    badgeVariant: 'mint',
    demoLabel: 'Sample Preview'
  },
  {
    id: 'APT-103',
    doctor: 'Dr. Sarah Bennett',
    specialty: 'Pediatric Specialist',
    hospital: 'Horizon Maternal Hospital',
    date: '08 Sep',
    time: '2:00 PM',
    status: 'Confirmed',
    badgeVariant: 'ice',
    demoLabel: 'Sample Preview'
  },
  {
    id: 'APT-104',
    doctor: 'Dr. Vikram Patel',
    specialty: 'General Surgeon',
    hospital: 'St. Jude Metropolitan Medical',
    date: '15 Sep',
    time: '9:15 AM',
    status: 'Completed',
    badgeVariant: 'demo',
    demoLabel: 'Sample Preview'
  }
];

// Prominent Next Appointment item
export const NEXT_APPOINTMENT = {
  doctor: 'Dr. Priya Sharma',
  specialty: 'Cardiologist',
  hospital: 'Apollo Hospitals & Health City',
  date: '30 Aug',
  time: '4:00 PM',
  location: 'Outpatient Cardiology Wing, Floor 3',
  demoLabel: 'Sample Preview'
};

// Healthcare Tips for Dashboard Carousel 3
export const HEALTHCARE_TIPS = [
  {
    id: 'TIP-01',
    title: 'Stay Hydrated',
    iconName: 'Droplets',
    tag: 'Hydration',
    summary: 'Drink at least 8–10 glasses of water daily to maintain cellular hydration, support joint lubrication, and assist kidney filtration.'
  },
  {
    id: 'TIP-02',
    title: 'Sleep Well',
    iconName: 'Moon',
    tag: 'Rest & Recovery',
    summary: 'Prioritize 7–9 hours of restful, uninterrupted sleep nightly to strengthen immune defenses and foster neurological memory consolidation.'
  },
  {
    id: 'TIP-03',
    title: 'Regular Checkups',
    iconName: 'CalendarCheck',
    tag: 'Preventive Care',
    summary: 'Schedule routine clinical wellness reviews and baseline metabolic lab screens to detect health risk markers early.'
  },
  {
    id: 'TIP-04',
    title: 'Healthy Eating',
    iconName: 'Apple',
    tag: 'Nutrition',
    summary: 'Incorporate antioxidant-rich fruits, leafy vegetables, fiber, and lean proteins while moderating processed sodium and refined sugars.'
  }
];

// AI Health Insights for Dashboard Carousel 4
export const AI_HEALTH_INSIGHTS = [
  {
    id: 'AI-01',
    title: 'AI Health Assistant',
    subtitle: 'Ask general health-information questions',
    description: 'Ask general questions to clarify healthcare terminology, understand wellness habits, or prepare questions for your doctor.',
    disclaimer: 'AI-generated health information is informational and not a diagnosis.'
  },
  {
    id: 'AI-02',
    title: 'Report Analysis',
    subtitle: 'Upload a medical report for AI-assisted explanation',
    description: 'Upload your lab or radiology report to receive a simplified explanation of complex clinical ranges and abbreviations.',
    disclaimer: 'AI-generated health information is informational and not a diagnosis.'
  },
  {
    id: 'AI-03',
    title: 'Health Information',
    subtitle: 'Get general informational guidance',
    description: 'Explore structured, evidence-based health articles, medication guide overviews, and preventive lifestyle recommendations.',
    disclaimer: 'AI-generated health information is informational and not a diagnosis.'
  }
];

// Family Health Profiles (Item 13)
export const FAMILY_PROFILES = [
  {
    id: 'FAM-01',
    name: 'Eleanor Vance (Me)',
    relationship: 'Primary Account',
    age: '32 Yrs',
    bloodGroup: 'O+',
    avatar: 'EV',
    isPrimary: true
  },
  {
    id: 'FAM-02',
    name: 'Margaret Vance',
    relationship: 'Mother',
    age: '58 Yrs',
    bloodGroup: 'B+',
    avatar: 'MV',
    isPrimary: false
  },
  {
    id: 'FAM-03',
    name: 'Arthur Vance',
    relationship: 'Father',
    age: '62 Yrs',
    bloodGroup: 'O+',
    avatar: 'AV',
    isPrimary: false
  },
  {
    id: 'FAM-04',
    name: 'Leo Vance',
    relationship: 'Child',
    age: '6 Yrs',
    bloodGroup: 'O+',
    avatar: 'LV',
    isPrimary: false
  }
];

// AROVEXA Core Services for Dashboard Section
export const AROVEXA_SERVICES = [
  {
    name: 'Hospitals',
    path: '/hospitals',
    iconName: 'Building2',
    description: 'Browse verified multi-specialty centers'
  },
  {
    name: 'Doctors',
    path: '/doctors',
    iconName: 'Stethoscope',
    description: 'Book board-certified specialists'
  },
  {
    name: 'Appointments',
    path: '/appointments',
    iconName: 'Calendar',
    description: 'Track and schedule clinical visits'
  },
  {
    name: 'Lab Tests',
    path: '/lab-tests',
    iconName: 'FlaskConical',
    description: 'Doorstep sample pathology booking'
  },
  {
    name: 'Reports',
    path: '/reports',
    iconName: 'FileText',
    description: 'Encrypted clinical record vault'
  },
  {
    name: 'AI Assistant',
    path: '/ai-assistant',
    iconName: 'Sparkles',
    description: 'General health info & report explanations'
  },
  {
    name: 'Family Health',
    path: '/family-health',
    iconName: 'Users',
    description: 'Manage appointments for family members'
  }
];

// Backward compatibility alias
export const MEDIDOC_SERVICES = AROVEXA_SERVICES;

// Sample Medical Reports for Search & Vault
export const SAMPLE_REPORTS = [
  {
    id: 'REP-8902',
    title: 'Complete Blood Count (CBC) & ESR',
    lab: 'Metropolitan Clinical Pathology Lab',
    date: 'Aug 24, 2026',
    fileType: 'PDF Document (1.2 MB)',
    status: 'Normal Biomarkers'
  },
  {
    id: 'REP-8874',
    title: 'Comprehensive Lipid & Cholesterol Profile',
    lab: 'Apex Diagnostic Pathology',
    date: 'Aug 10, 2026',
    fileType: 'PDF Document (850 KB)',
    status: 'Reviewed by Doctor'
  },
  {
    id: 'REP-8810',
    title: 'High-Resolution Chest X-Ray (PA View)',
    lab: 'St. Jude Radiology Center',
    date: 'Jul 15, 2026',
    fileType: 'DICOM / PDF (4.1 MB)',
    status: 'Archived'
  }
];
