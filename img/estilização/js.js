let historyData = [];
let totalValue = 0;

function registerProduct() {
    const productName = document.getElementById('product-name').value;
    const productValue = parseFloat(document.getElementById('product-value').value);

    if (productName === '' || isNaN(productValue)) {
        alert('Por favor, preencha todos os campos do produto corretamente.');
        return;
    }

    totalValue += productValue;

    const data = {
        productName,
        productValue: productValue.toFixed(2)
    };
    historyData.push(data);
    updateHistory();
    updateTotalValue();
    clearProductInputs();
    saveToLocalStorage(); // Salvar dados após registrar um produto
}

function calculateChange() {
    const paymentMethod = document.getElementById('payment-method').value;
    const amountPaid = parseFloat(document.getElementById('amount-paid').value);

    if (isNaN(amountPaid)) {
        alert('Por favor, preencha o valor pago corretamente.');
        return;
    }

    let change = amountPaid - totalValue;

    if (paymentMethod === 'credito') {
        const installments = parseInt(document.getElementById('installments').value);

        if (isNaN(installments) || installments <= 0) {
            alert('Por favor, preencha o número de parcelas corretamente.');
            return;
        }

        change = (totalValue / installments).toFixed(2);
    }

    const resultHtml = `
        <div class="result-content">
            <p>Método de Pagamento: ${paymentMethod}</p>
            <p>Valor Pago: ${amountPaid.toFixed(2)}</p>
            ${paymentMethod === 'credito' ? `<p>Parcelas: ${document.getElementById('installments').value} x ${change}</p>` : `<p>Troco: ${change}</p>`}
        </div>
    `;
    const resultBox = document.getElementById('result');
resultBox.innerHTML = resultHtml;

if (paymentMethod !== 'credito' && change < 0) {
    resultBox.style.backgroundColor = 'red';
    resultBox.style.color = 'white'; // Texto em branco
} else {
    resultBox.style.backgroundColor = 'blue';
    resultBox.style.color = 'white'; // Texto em branco
}
}

function updateHistory() {
    const historyContent = document.querySelector('.conteudo_historico');
    historyContent.innerHTML = '';
    historyData.forEach((entry, index) => {
        const entryHtml = `
            <div class="historico-entry">
                <p>Produto: ${entry.productName}</p>
                <p>Valor do Produto: ${entry.productValue}</p>
                <button style="background-color: red; color: aliceblue;" onclick="deleteEntry(${index})">Excluir</button>
            </div>
        `;
        historyContent.innerHTML += entryHtml;
    });
}

function updateTotalValue() {
    const totalHtml = `
        <div class="result-content">
            <p>Valor Total Acumulado: ${totalValue.toFixed(2)}</p>
        </div>
    `;
    document.getElementById('result').innerHTML = totalHtml;
}

function deleteEntry(index) {
    totalValue -= parseFloat(historyData[index].productValue);
    historyData.splice(index, 1);
    updateHistory();
    updateTotalValue();
    saveToLocalStorage(); // Salvar dados após excluir um produto
}

function clearProductInputs() {
    document.getElementById('product-name').value = '';
    document.getElementById('product-value').value = '';
}

function showInstallments() {
    const paymentMethod = document.getElementById('payment-method').value;
    const installmentsSection = document.getElementById('installments-section');
    if (paymentMethod === 'credito') {
        installmentsSection.style.display = 'block';
    } else {
        installmentsSection.style.display = 'none';
        document.getElementById('installments').value = '';
    }
}

function saveData() {
    const dataToSave = {
        historyData,
        totalValue
    };
    console.log('Dados salvos:', JSON.stringify(dataToSave));
    alert('Dados salvos no console.');
}

// Função para salvar dados no localStorage
function saveToLocalStorage() {
    const dataToSave = {
        historyData,
        totalValue
    };
    localStorage.setItem('salesData', JSON.stringify(dataToSave));
}

// Função para carregar dados do localStorage
function loadFromLocalStorage() {
    const savedData = localStorage.getItem('salesData');
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        historyData = parsedData.historyData || [];
        totalValue = parsedData.totalValue || 0;
        updateHistory();
        updateTotalValue();
    }
}

// Carregar dados ao carregar a página
window.onload = function() {
    loadFromLocalStorage();
}

// tela de login

document.addEventListener('DOMContentLoaded', function() {
    const loginModal = document.getElementById('login-modal');
    const loginButton = document.getElementById('login-button');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');

    // Função para validar o login
    function validateLogin() {
        const username = usernameInput.value;
        const password = passwordInput.value;
        if (username === 'ronaldo' && password === 'admin123') {  // Substitua pelo usuário e senha corretos
            loginModal.style.display = 'none';
        } else {
            errorMessage.style.display = 'block';
        }
    }

    // Adiciona evento ao botão de login
    loginButton.addEventListener('click', validateLogin);

    // Adiciona evento à tecla Enter
    usernameInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            validateLogin();
        }
    });

    passwordInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            validateLogin();
        }
    });

    // Exibe o modal ao carregar a página
    loginModal.style.display = 'flex';
});
