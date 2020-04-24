(w => {
    const btnLogin = s5.get('button.btn').shift();
    const controles = s5.get('[data-prop]');
    const form = s5.get('form.container').shift();
    let modal;

    document.addEventListener('DOMContentLoaded', () => modal = M.Modal.init(document.querySelector('.modal')));

    const login = async () => {
        const { user, pass } = controles.reduce((ac, ct) => {
            ac[ct.dataset.prop] = ct.value;
            return ac;
        }, {});

        try {
            const { data: loginData } = await s5.hr.get('data.json');
            const { user: usuario, pass: contrasena } = loginData;

            if (usuario === user && contrasena === pass) {
                modal.open();
            }
        }
        catch (e) {

        }
    };

    const disabled = o => o ? btnLogin.attribute('disabled', 'disabled') : btnLogin.removeAttribute('disabled');

    controles.addEvent('change', () => disabled(!form.checkValidity()));

    btnLogin.addEvent('click', () => {
        if (form.checkValidity()) {
            login();
        }
    });

    form.addEvent('submit', e => {
        e.preventDefault();
        e.stopPropagation();
    });

    disabled(!form.checkValidity());
})(window);