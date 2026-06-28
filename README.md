# 🔬 Expedição Celular 3D

Atividade interativa sobre a **célula animal** para usar em sala (tablets, celulares ou computador).
O aluno toca nas organelas para dar um **zoom 3D** e descobrir o que cada uma faz, depois responde
um **quiz**. Ao final, o resultado é registrado com **nome e turma**.

É um único arquivo (`index.html`), sem instalação e sem dependências.

## ✨ O que tem
- Célula em **3D** com iluminação, volume e profundidade.
- **Zoom-focus**: ao clicar, a "câmera" mergulha na organela, que fica nítida e detalhada
  (ex.: as cristas da mitocôndria), enquanto o resto desfoca (efeito bokeh).
- **Modo Explorar** + **Quiz** com pontuação.
- **Sessão do aluno** (nome + turma).
- **Coleta de resultados**:
  - sempre salva um **backup local** no aparelho (e permite baixar CSV/TXT por turma);
  - opcionalmente envia tudo para uma **Planilha Google central** (uma aba por turma) —
    ideal quando cada aluno usa um tablet diferente.

## 🚀 Publicar (Vercel) e compartilhar o link
1. (Opcional, mas recomendado) Configure a coleta central no Google Planilhas seguindo o
   **[INTEGRACAO_GOOGLE.md](INTEGRACAO_GOOGLE.md)** e cole a URL na linha
   `const SHEET_ENDPOINT = "";` no início do `<script>` do `index.html`.
2. Suba na **Vercel** (qualquer um dos modos):
   - **Arrastar e soltar:** coloque o `index.html` numa pasta e faça o upload em
     <https://vercel.com> → *Add New… → Project → Deploy*.
   - **Via GitHub:** importe este repositório na Vercel; a cada `git push` ela republica.
   - Não precisa de configuração extra: a Vercel serve o `index.html` automaticamente.
3. **Compartilhe o link** (ex.: `https://expedicao-celular.vercel.app`).
   Todos que abrirem o mesmo link já enviam os resultados para a sua planilha.

> Trocou a `SHEET_ENDPOINT` depois? Faça um **novo deploy** para o link usar a URL nova.

## 👩‍🏫 Painel do Professor
Acesse pela tela inicial ou pela tela final (**👩‍🏫 Painel do professor**). Lá dá para:
- ver os resultados agrupados por turma (com média);
- baixar **um arquivo por turma** (CSV abre no Excel/Planilhas, ou TXT);
- configurar/checar o envio para o Google Planilhas (status e reenvio de pendentes);
- apagar os dados locais do aparelho.

## 📁 Arquivos
| Arquivo | Para que serve |
|---|---|
| `index.html` | O jogo inteiro (HTML/CSS/JS/SVG). |
| `google-apps-script.gs` | Script para colar no Google Apps Script (recebe e grava os resultados). |
| `INTEGRACAO_GOOGLE.md` | Passo a passo da integração com o Google Planilhas + deploy na Vercel. |

## 🔒 Observação de privacidade
Se o jogo for público (Vercel), a URL do endpoint fica visível no código-fonte. Essa URL
**só grava** dados (não permite ler a planilha). Detalhes e como reduzir riscos estão no
final do `INTEGRACAO_GOOGLE.md`.
