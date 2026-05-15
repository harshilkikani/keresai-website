# Broaden positioning across i18n.js
# - hero.eyebrow / hero.sub
# - industries.label, .title, .body, .1-4 (drop .5)
# - trust.* broader
import re

with open('assets/i18n.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Per-language replacement values
DATA = {
    'en': {
        'hero.eyebrow': 'AI voice agent · For businesses that live on the phone',
        'hero.sub': 'Keres is an AI voice agent for modern service-oriented businesses. It picks up every call within two rings, qualifies the lead, and texts you a summary — twenty-four hours a day.',
        'industries.label': "Who it's for",
        'industries.title.1': 'Built for the',
        'industries.title.accent': 'businesses that live on the phone',
        'industries.body': 'Keres serves communication-heavy businesses where the next call is the next deal — from one-agent brokerages to multi-location operations.',
        'industries.1.name': 'Real Estate',
        'industries.1.desc': 'Agents, brokerages, leasing teams, and property managers. After-hours buyer inquiries, showing coordination, listing follow-ups, seller intake.',
        'industries.2.name': 'Home Services',
        'industries.2.desc': 'HVAC, plumbing, roofing, septic, electrical, and towing. Intake, dispatch, scheduling, and follow-up handled around the clock.',
        'industries.3.name': 'Med Spas & Wellness',
        'industries.3.desc': 'Aesthetic clinics, wellness studios, and dental practices. Booking, rescheduling, intake forms, and pre-treatment qualification.',
        'industries.4.name': 'Professional Intake',
        'industries.4.desc': 'Law firms, financial advisors, accountants, consultants. New-client qualification, conflict screening, and consultation booking.',
        'trust.label': 'Trusted by teams across',
        'trust.1': 'Real Estate',
        'trust.2': 'Home Services',
        'trust.3': 'Med Spas',
        'trust.4': 'Legal Intake',
        'trust.5': 'Brokerages',
        'trust.6': 'Property Management',
    },
    'es': {
        'hero.eyebrow': 'Agente de voz IA · Para negocios que viven en el teléfono',
        'hero.sub': 'Keres es un agente de voz de IA para negocios modernos orientados al servicio. Atiende cada llamada en dos timbres, califica el lead y te envía un resumen por SMS — las veinticuatro horas.',
        'industries.label': 'Para quién es',
        'industries.title.1': 'Hecho para los',
        'industries.title.accent': 'negocios que viven en el teléfono',
        'industries.body': 'Keres sirve a negocios con mucha comunicación donde la próxima llamada es el próximo trato — desde corredurías de un agente hasta operaciones de múltiples sedes.',
        'industries.1.name': 'Bienes Raíces',
        'industries.1.desc': 'Agentes, corredurías, equipos de alquiler y administradores de propiedades. Consultas de compradores fuera de horario, coordinación de visitas, seguimiento de listings, captación de vendedores.',
        'industries.2.name': 'Servicios para el Hogar',
        'industries.2.desc': 'HVAC, plomería, techos, séptico, electricidad y remolque. Recepción, despacho, agenda y seguimiento, las 24 horas.',
        'industries.3.name': 'Spas y Bienestar',
        'industries.3.desc': 'Clínicas estéticas, estudios de bienestar y consultorios dentales. Reservas, reprogramaciones, formularios y calificación pre-tratamiento.',
        'industries.4.name': 'Admisión Profesional',
        'industries.4.desc': 'Bufetes, asesores financieros, contadores y consultores. Calificación de nuevos clientes, verificación de conflictos y reserva de consultas.',
        'trust.label': 'De confianza para equipos en',
        'trust.1': 'Bienes Raíces',
        'trust.2': 'Servicios para el Hogar',
        'trust.3': 'Spas Médicos',
        'trust.4': 'Admisión Legal',
        'trust.5': 'Corredurías',
        'trust.6': 'Administración',
    },
    'fr': {
        'hero.eyebrow': "Agent vocal IA · Pour les entreprises qui vivent au téléphone",
        'hero.sub': "Keres est un agent vocal IA pour les entreprises modernes orientées service. Il décroche en deux sonneries, qualifie le prospect et vous envoie un résumé par SMS — vingt-quatre heures sur vingt-quatre.",
        'industries.label': 'À qui ça sert',
        'industries.title.1': 'Conçu pour les',
        'industries.title.accent': 'entreprises qui vivent au téléphone',
        'industries.body': "Keres sert les entreprises où le téléphone est central, où le prochain appel est la prochaine affaire — de la petite agence aux opérations multi-sites.",
        'industries.1.name': 'Immobilier',
        'industries.1.desc': "Agents, agences, équipes de location, gestionnaires de biens. Demandes d'acheteurs hors heures, coordination de visites, suivi des annonces, prise en charge des vendeurs.",
        'industries.2.name': 'Services à Domicile',
        'industries.2.desc': 'CVC, plomberie, toiture, fosses septiques, électricité, remorquage. Prise en charge, répartition, planification et suivi 24/7.',
        'industries.3.name': 'Spas & Bien-être',
        'industries.3.desc': "Cliniques esthétiques, studios bien-être, cabinets dentaires. Réservation, replanification, formulaires d'admission et qualification pré-traitement.",
        'industries.4.name': 'Accueil Professionnel',
        'industries.4.desc': 'Cabinets juridiques, conseillers financiers, experts-comptables, consultants. Qualification, vérification de conflits, prise de consultation.',
        'trust.label': 'Adopté par des équipes en',
        'trust.1': 'Immobilier',
        'trust.2': 'Services à Domicile',
        'trust.3': 'Med-Spas',
        'trust.4': 'Accueil Juridique',
        'trust.5': 'Agences',
        'trust.6': 'Gestion Locative',
    },
    'de': {
        'hero.eyebrow': 'KI-Sprachagent · Für Unternehmen, die am Telefon leben',
        'hero.sub': 'Keres ist ein KI-Sprachagent für moderne serviceorientierte Unternehmen. Er nimmt jeden Anruf innerhalb von zwei Klingeln entgegen, qualifiziert den Lead und schickt Ihnen eine Zusammenfassung per SMS — rund um die Uhr.',
        'industries.label': 'Für wen es ist',
        'industries.title.1': 'Gebaut für',
        'industries.title.accent': 'Unternehmen, die am Telefon leben',
        'industries.body': 'Keres dient kommunikationsintensiven Unternehmen, in denen der nächste Anruf das nächste Geschäft ist — vom Einzelmakler bis zu Mehrstandort-Betrieben.',
        'industries.1.name': 'Immobilien',
        'industries.1.desc': 'Makler, Maklerbüros, Vermietungsteams, Hausverwaltungen. Käuferanfragen außerhalb der Geschäftszeiten, Besichtigungs-Koordination, Listing-Follow-up, Verkäufer-Annahme.',
        'industries.2.name': 'Handwerk & Service',
        'industries.2.desc': 'HLK, Klempnerei, Dachdeckerei, Klärgrube, Elektrik und Abschleppen. Annahme, Disposition, Planung und Follow-up rund um die Uhr.',
        'industries.3.name': 'Med-Spas & Wellness',
        'industries.3.desc': 'Ästhetische Kliniken, Wellness-Studios und Zahnarztpraxen. Buchung, Umplanung, Aufnahmeformulare und Vorab-Qualifizierung.',
        'industries.4.name': 'Professionelle Annahme',
        'industries.4.desc': 'Kanzleien, Finanzberater, Steuerberater, Consultants. Neukunden-Qualifizierung, Konfliktprüfung und Terminbuchung.',
        'trust.label': 'Eingesetzt von Teams in',
        'trust.1': 'Immobilien',
        'trust.2': 'Handwerk & Service',
        'trust.3': 'Med-Spas',
        'trust.4': 'Kanzlei-Annahme',
        'trust.5': 'Maklerbüros',
        'trust.6': 'Hausverwaltung',
    },
    'pt': {
        'hero.eyebrow': 'Agente de voz IA · Para negócios que vivem no telefone',
        'hero.sub': 'A Keres é um agente de voz de IA para negócios modernos orientados a serviço. Atende cada ligação em dois toques, qualifica o lead e envia um resumo por SMS — vinte e quatro horas por dia.',
        'industries.label': 'Para quem é',
        'industries.title.1': 'Feito para os',
        'industries.title.accent': 'negócios que vivem no telefone',
        'industries.body': 'A Keres atende negócios intensivos em comunicação onde a próxima ligação é o próximo negócio — de corretoras de um agente a operações multi-unidade.',
        'industries.1.name': 'Imóveis',
        'industries.1.desc': 'Corretores, imobiliárias, equipes de locação e gestores de propriedades. Consultas de compradores fora do horário, coordenação de visitas, follow-up de listagens, captação de vendedores.',
        'industries.2.name': 'Serviços Residenciais',
        'industries.2.desc': 'HVAC, encanamento, telhados, fossa séptica, elétrica e reboque. Atendimento, despacho, agendamento e follow-up 24/7.',
        'industries.3.name': 'Spas e Bem-estar',
        'industries.3.desc': 'Clínicas estéticas, studios de bem-estar e consultórios odontológicos. Reservas, reagendamentos, formulários e qualificação pré-tratamento.',
        'industries.4.name': 'Recepção Profissional',
        'industries.4.desc': 'Escritórios de advocacia, consultores financeiros, contadores e consultores. Qualificação de novos clientes, triagem de conflitos e agendamento de consultas.',
        'trust.label': 'Usado por equipes em',
        'trust.1': 'Imóveis',
        'trust.2': 'Serviços Residenciais',
        'trust.3': 'Med-Spas',
        'trust.4': 'Recepção Jurídica',
        'trust.5': 'Imobiliárias',
        'trust.6': 'Administração',
    },
}

def replace_key_in_section(section, key, value):
    """Replace a single key's value within a section, robust to multi-line condensed format."""
    esc = value.replace('\\', '\\\\').replace("'", "\\'")
    # Match: 'key': '...value...'  (where value may include escaped quotes)
    pattern = re.compile(r"('" + re.escape(key) + r"'\s*:\s*)'(?:[^'\\]|\\.)*'")
    new_section, n = pattern.subn(lambda m, v=esc: m.group(1) + "'" + v + "'", section, count=1)
    return new_section, n

for lang, fields in DATA.items():
    t_idx = js.index('const T = {')
    m = re.search(rf'\n    {lang}:\s*\{{', js[t_idx:])
    start = t_idx + m.end()
    depth = 1
    i = start
    while i < len(js) and depth > 0:
        if js[i] == '{':
            depth += 1
        elif js[i] == '}':
            depth -= 1
        i += 1
    section_end = i - 1
    section = js[start:section_end]

    for key, value in fields.items():
        section, n = replace_key_in_section(section, key, value)
        if n == 0:
            print(f'  WARN: {lang}/{key} not matched')

    # Remove industries.5 entirely (we collapsed to 4 cards)
    section = re.sub(r"\s*'industries\.5\.name'\s*:\s*'[^']*(?:\\'[^']*)*',?", '', section)
    section = re.sub(r"\s*'industries\.5\.desc'\s*:\s*'[^']*(?:\\'[^']*)*',?", '', section)

    js = js[:start] + section + js[section_end:]

with open('assets/i18n.js', 'w', encoding='utf-8') as f:
    f.write(js)

print('Broadened positioning written.')
