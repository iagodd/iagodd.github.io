const menuLinks = document.querySelectorAll('.lista-nav a');


function getDistanceFromTheTop (element) {
    const id = element.getAttribute("href");
    return document.querySelector(id).offsetTop;
}

function nativeScroll(distanceFromTheTop) {
    window.scroll({
        top: distanceFromTheTop,
        behavior : "smooth",
    });
}

function scrollToSection (event) {
    event.preventDefault();
    const distanceFromTheTop = getDistanceFromTheTop(event.target) - 75;
    nativeScroll(distanceFromTheTop);

}

menuLinks.forEach((link) => {
    link.addEventListener("click" , scrollToSection);
});


const rodapeLinks = document.querySelectorAll('.menu-rodape a');


function getDistanceFromTheTop (element) {
    const id = element.getAttribute("href");
    return document.querySelector(id).offsetTop;
}

function nativeScroll(distanceFromTheTop) {
    window.scroll({
        top: distanceFromTheTop,
        behavior : "smooth",
    });
}

function scrollToSection (event) {
    event.preventDefault();
    const distanceFromTheTop = getDistanceFromTheTop(event.target) - 75;
    nativeScroll(distanceFromTheTop);

}

rodapeLinks.forEach((link) => {
    link.addEventListener("click" , scrollToSection);
});



class FormSubmit {
    constructor(settings) {
        this.settings = settings;
        this.form = document.querySelector(settings.form);
        this.formButton = document.querySelector(settings.button);

        if (this.form) {
            this.url = this.form.getAttribute("action");
        }
        this.sendForm = this.sendForm.bind(this);
    }

    displaySuccess() {
        this.form.innerHTML = this.settings.success;
    }

    displayError() {
        this.form.innerHTML = this.settings.error;
    }

    displayValidationError() {
        const validationError = document.createElement('div');
        validationError.className = 'validation-error';
        validationError.innerText = 'Por favor, preencha todos os campos.';
        this.form.appendChild(validationError);
    }

    removeValidationError() {
        const validationError = this.form.querySelector('.validation-error');
        if (validationError) {
            validationError.remove();
        }
    }

    getFormObject() {
        const formObject = {};
        const fields = this.form.querySelectorAll("[name]");
        fields.forEach((field) => {
            formObject[field.getAttribute("name")] = field.value;
        });
        return formObject;
    }

    validateForm() {
        const fields = this.form.querySelectorAll("[name]");
        for (let field of fields) {
            if (!field.value.trim()) {
                return false;
            }
        }
        return true;
    }

    onSubmission(event) {
        event.preventDefault();
        event.target.disabled = true;
        event.target.innerText = "Enviando...";
    }

    async sendForm(event) {
        try {
            if (!this.validateForm()) {
                this.removeValidationError();
                this.displayValidationError();
                return;
            }
            this.onSubmission(event);
            await fetch(this.url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(this.getFormObject()),
            });
            this.displaySuccess();
        } catch (error) {
            this.displayError();
            throw new Error(error);
        }
    }

    init() {
        if (this.form) this.formButton.addEventListener("click", this.sendForm);
        return this;
    }
}

const formSubmit = new FormSubmit({
    form: "[data-form]",
    button: "[data-button]",
    success: "<h1 class='success'> Mensagem Enviada com sucesso! </h1>",
    error: "<h1 class='error'> Não foi possível enviar a mensagem. </h1>",
});

formSubmit.init();


