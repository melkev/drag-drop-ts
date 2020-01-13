// autobind decorator function
function autoBind( 
  _: any , 
  _2: string , 
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this)
      return boundFn
    }
  }
  return adjDescriptor
}



// project input claass
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    // The importNode() method imports a node from another document.The imported node can be of all node types.
    const importedNode = document.importNode(this.templateElement.content,true);
    // The firstElementChild property returns the first child element of the specified element.
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';

    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

    this.configure();
    this.attach();
  }
  @autoBind
  private submitHandler(event: Event) {
    event.preventDefault();
    console.log(this.titleInputElement.value);
  }

  private configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  private attach() {
    // The insertAdjacentHTML() method inserts a text as HTML, into a specified position.
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const prjInput = new ProjectInput();
