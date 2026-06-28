# 📊 Integração com o Google Planilhas (vários tablets → 1 planilha)

Quando cada aluno usa **um tablet diferente**, os resultados não se juntam sozinhos.
Para reuni-los em **uma única planilha** (com **uma aba por turma**), use o passo a passo abaixo.
É **gratuito**, usa só a conta Google da professora e leva ~10 minutos para configurar **uma vez**.

> Resumo de como funciona: cada tablet, ao terminar o quiz, envia o resultado para um
> "app da web" do Google Apps Script, que grava a linha do aluno na aba da turma.
> Se o tablet estiver sem internet na hora, o resultado fica guardado e é enviado
> automaticamente quando a conexão voltar (e também fica salvo como backup no tablet).

---

## 1) Criar a planilha
1. Acesse <https://sheets.google.com> e crie uma planilha em branco.
2. Dê um nome, por exemplo: **Expedição Celular — Resultados**.
   (Não precisa criar as abas das turmas — elas são criadas sozinhas.)

## 2) Colar o script
1. Na planilha, vá em **Extensões → Apps Script**.
2. Apague qualquer conteúdo que estiver lá e **cole todo o conteúdo do arquivo
   `google-apps-script.gs`** (que está junto deste projeto).
3. Clique no ícone de **salvar** (💾).

## 3) Publicar como "app da web"
1. No Apps Script, clique em **Implantar → Nova implantação**.
2. Em **Tipo**, escolha **App da Web** (engrenagem ⚙️ → "App da Web").
3. Configure:
   - **Descrição:** Expedição Celular
   - **Executar como:** *Eu* (a sua conta)
   - **Quem pode acessar:** **Qualquer pessoa**
4. Clique em **Implantar** e **autorize** o acesso quando pedir
   (escolha sua conta → "Avançado" → "Acessar (não seguro)" → "Permitir").
   *Isso é normal: você está autorizando o seu próprio script a escrever na sua planilha.*
5. Copie a **URL do app da Web** — ela termina em **`/exec`**.
   Exemplo: `https://script.google.com/macros/s/AKfycb..../exec`

## 4) Conectar o jogo a essa URL
Há duas formas (escolha uma):

**A) Deixar já configurado no arquivo (recomendado para distribuir nos tablets)**
1. Abra o `index.html`.
2. Lá no início do `<script>`, troque a linha:
   ```js
   const SHEET_ENDPOINT = "";
   ```
   por:
   ```js
   const SHEET_ENDPOINT = "https://script.google.com/macros/s/AKfycb..../exec";
   ```
3. Salve e copie esse mesmo `index.html` para todos os tablets.

**B) Colar a URL em cada tablet (sem mexer no arquivo)**
1. Abra o jogo no tablet → **👩‍🏫 Painel do professor**.
2. Em **“☁️ Envio automático para o Google Planilhas”**, cole a URL e toque em **💾 Salvar URL**.
3. O status deve mudar para **✅ Configurado**.

## 5) Testar
1. Faça um quiz de teste em um tablet (qualquer turma, ex.: "TESTE").
2. Abra a planilha: deve aparecer uma aba **TESTE** com a linha do aluno.
3. Pode apagar a aba/linha de teste depois.

---

## Como fica a planilha
- Uma **aba por turma** (ex.: `8º ano A`, `8º ano B`, `9º ano C`).
- Em cada aba, **uma linha por aluno**, com as colunas:

  `Data/Hora | Nome | Turma | Acertos | Total | Percentual (%) | Pontos | Membrana Plasmática | Citoplasma | Núcleo | Mitocôndria | Ribossomo | Retículo Endoplasmático | Complexo de Golgi | Lisossomo`

- Cada coluna de organela mostra a **resposta escolhida** e se acertou: `... (OK)` ou `... (X)`.
- Para ter os "3 arquivos" separados, basta **baixar cada aba**: na planilha,
  clique na aba da turma → **Arquivo → Fazer download → CSV** (baixa só aquela aba).

---

## Perguntas comuns

**E se um tablet estiver sem internet?**
O resultado fica guardado no tablet e é enviado sozinho quando a internet voltar
(ou quando alguém abrir o jogo de novo nesse tablet). No Painel do Professor o status
mostra quantos resultados estão **aguardando envio**, e há o botão **📤 Enviar pendentes**.

**Preciso atualizar o script depois.** 
Edite o código e use **Implantar → Gerenciar implantações → ✏️ Editar → Nova versão**.
Assim a URL `/exec` continua a mesma (não precisa reconfigurar os tablets).

**É seguro?**
A URL aceita apenas **gravar** resultados na sua planilha. Não expõe os dados já
gravados (quem tiver a URL não consegue ler a planilha). Ainda assim, evite divulgá-la
publicamente.

**Backup:** mesmo com o envio para a nuvem, cada tablet guarda uma cópia local.
No Painel do Professor dá para baixar CSV/TXT por turma direto do tablet.
