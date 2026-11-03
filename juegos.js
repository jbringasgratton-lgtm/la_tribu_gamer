const projectData = {
  scratch: {
    eyebrow: 'Proyecto 01 / Scratch',
    title: 'Scratch',
    description: 'Dos proyectos creados con Scratch. Explorá cada uno.',
    placeholder: 'Próximamente'
  },
  inventor: {
    eyebrow: 'Proyecto 02 / App Inventor',
    title: 'App Inventor',
    description: 'Dos proyectos creados con MIT App Inventor. Explorá cada uno.',
    placeholder: 'El proyecto aparecerá aquí próximamente.'
  },
  pseint: {
    eyebrow: 'Proyecto 03 / PSeInt',
    title: 'PSeInt',
    description: 'Un proyecto desarrollado con PSeInt. Dos capturas forman parte del mismo algoritmo.',
    placeholder: 'El proyecto aparecerá aquí próximamente.'
  }
};

const projectLinks = {
  scratch: ['https://scratch.mit.edu/projects/1398002334/fullscreen/', 'https://scratch.mit.edu/projects/1398002334/fullscreen/'],
  inventor: ['appinventor-qr-1.png', 'appinventor-qr-2.png'],
  pseint: ['pseint-1.png', 'pseint-2.png']
};

const inventorDescriptions = {
  1: 'Esta aplicación cuenta con tres botones principales, cada uno de los cuales cumple una función específica para facilitar su uso. En primer lugar, uno de los botones permite sacar fotografías, de modo que el usuario pueda capturar imágenes de manera rápida y sencilla. Por otro lado, dispone de un botón que sirve para borrar las fotografías que ya no se desean conservar, lo que permite mantener la aplicación organizada y eliminar las imágenes innecesarias. Finalmente, el tercer botón permite guardar las fotografías tomadas, para que el usuario pueda conservarlas y acceder a ellas posteriormente. De esta manera, los tres botones trabajan en conjunto para ofrecer una experiencia práctica, sencilla y organizada, ya que permiten tomar, eliminar y guardar fotografías de forma fácil y eficiente.',
  2: 'Esta aplicación es una calculadora práctica para resolver operaciones matemáticas básicas (suma, resta, multiplicación y división). Facilita los cálculos cotidianos y escolares, ahorrando tiempo al evitar las operaciones manuales mediante una interfaz sencilla donde el usuario ingresa los números, elige la operación y ve el resultado en pantalla.'
};
const picker = document.querySelector('#projectPicker');
const detail = document.querySelector('#projectDetail');
const backButton = document.querySelector('#backButton');
const detailEyebrow = document.querySelector('#detailEyebrow');
const detailTitle = document.querySelector('#detailTitle');
const detailDescription = document.querySelector('#detailDescription');
const projectSlots = document.querySelector('#projectSlots');

let activeProject = '';

function renderProjectSlots(projectName) {
  projectSlots.replaceChildren();

  [1, 2].forEach((slotNumber) => {
    const projectUrl = projectLinks[projectName][slotNumber - 1];
    const slot = document.createElement('article');
    slot.className = 'project-slot';
    slot.dataset.slot = String(slotNumber);

    if (projectName === 'scratch' || projectName === 'inventor') {
      const heading = document.createElement('h2');
      heading.textContent = `Proyecto ${slotNumber}`;
      slot.append(heading);
    }

    const screen = document.createElement('div');
    screen.className = 'project-slot-screen';

    if (projectName === 'pseint' && slotNumber === 1) {
      const imageLabel = document.createElement('span');
      imageLabel.className = 'project-image-label';
      imageLabel.textContent = 'Proyecto 1';
      screen.append(imageLabel);
    }

    if ((projectName === 'inventor' || projectName === 'pseint') && projectUrl) {
      const projectImage = document.createElement('img');
      projectImage.className = 'project-qr-image';
      projectImage.src = projectUrl;
      projectImage.alt = projectName === 'inventor'
        ? `Código QR del proyecto ${slotNumber} de App Inventor`
        : `Captura del algoritmo de PSeInt ${slotNumber}`;
      projectImage.loading = 'eager';
      screen.append(projectImage);

      // La sección de App Inventor debe mostrar solo los QR, sin descripción debajo.
    } else if (projectName === 'scratch' && projectUrl) {
      const projectId = getScratchProjectId(projectUrl);
      if (projectId && false) {
        const frame = document.createElement('iframe');
        frame.title = `Proyecto ${slotNumber} de ${projectData[projectName].title}`;
        frame.allow = 'autoplay; fullscreen';
        frame.allowFullscreen = true;
        frame.src = `https://scratch.mit.edu/projects/${projectId}/embed`;
        screen.append(frame);
      }

      if (slotNumber === 1) {
        const scratchLayout = document.createElement('div');
        scratchLayout.className = 'scratch-layout';

        const projectBox = document.createElement('div');
        projectBox.className = 'scratch-project-box';

        const link = document.createElement('a');
        link.className = 'project-open-link';
        link.href = projectUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = 'Jugar';
        projectBox.append(link);

        const projectImage = document.createElement('img');
        projectImage.className = 'scratch-project-image';
        projectImage.src = 'scratch-proyecto-1.png';
        projectImage.alt = 'Imagen del proyecto 1 de Scratch';
        projectImage.loading = 'eager';

        scratchLayout.append(projectBox, projectImage);
        screen.append(scratchLayout);
      } else {
        const projectBox = document.createElement('div');
        projectBox.className = 'scratch-project-box scratch-project-box--second';

        const link = document.createElement('a');
        link.className = 'project-open-link';
        link.href = projectUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = 'Ver';
        projectBox.append(link);

        const details = document.createElement('div');
        details.className = 'scratch-project-details';

        const descriptionLabel = document.createElement('p');
        descriptionLabel.className = 'scratch-project-description-label';
        descriptionLabel.textContent = 'Descripción';

        const description = document.createElement('p');
        description.className = 'scratch-project-description';
        description.textContent = 'En el video se presenta un local de hamburguesas llamado “En Oso”. Se muestra el interior del establecimiento, donde se encuentran las mesas, el mostrador y los carteles con los productos que se ofrecen. También aparecen dos personas que representan una situación dentro del negocio, mostrando el lugar y la atención al público. A lo largo del video se alternan imágenes del interior del local con una presentación de su fachada y su nombre, permitiendo observar tanto el ambiente del establecimiento como su identidad visual. De esta manera, el video sirve para dar a conocer el negocio, mostrar su aspecto y presentar el espacio donde se desarrolla la actividad comercial. En el único lugar en el que se puede interactuar es en la tercer parte que Tenes que elegir la hamburguesa de tu preferencia';

        details.append(descriptionLabel, description);
        screen.append(projectBox, details);
      }
    }

    if (!screen.childElementCount) {
      const placeholder = document.createElement('p');
      placeholder.className = 'project-slot-placeholder';
      placeholder.textContent = projectData[projectName].placeholder;
      screen.append(placeholder);
    }

    slot.append(screen);
    projectSlots.append(slot);
  });
}

function getScratchProjectId(value) {
  const trimmedValue = value.trim();
  if (/^\d+$/.test(trimmedValue)) return trimmedValue;

  try {
    const url = new URL(trimmedValue);
    if (url.hostname !== 'scratch.mit.edu' && !url.hostname.endsWith('.scratch.mit.edu')) return '';
    return url.pathname.match(/\/projects\/(\d+)/)?.[1] || '';
  } catch {
    return '';
  }
}

function openProject(projectName) {
  activeProject = projectName;
  const project = projectData[projectName];
  detail.dataset.project = projectName;
  detailEyebrow.textContent = project.eyebrow;
  detailTitle.textContent = project.title;
  detailDescription.textContent = project.description;
  detailEyebrow.hidden = false;
  detailDescription.hidden = false;
  picker.hidden = true;
  detail.hidden = false;
  projectSlots.hidden = false;
  projectSlots.dataset.project = projectName;
  renderProjectSlots(projectName);

  backButton.focus();
}

document.querySelectorAll('[data-project]').forEach((button) => {
  button.addEventListener('click', () => openProject(button.dataset.project));
});

backButton.addEventListener('click', () => {
  detail.hidden = true;
  picker.hidden = false;
  document.querySelector(`[data-project="${activeProject}"]`)?.focus();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !detail.hidden) backButton.click();
});
