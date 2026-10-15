# Cartão de contatos da Brado

Endereço permanente: **https://bradocarnes.com.br/contatos/**

O QR code contém somente esse endereço. Os dados ficam na página e podem mudar sem trocar o QR das sacolas. Preserve o domínio e a rota `/contatos/`; se a hospedagem mudar, mantenha essa rota funcionando ou com redirecionamento para a nova página.

## Atualizar os contatos

Edite `contatos/dados.json` no repositório `josuerosa-enterprise/brado-site`, branch `main`, e salve a alteração. O GitHub Pages publica a atualização. Reabra a página após a publicação para conferir os botões.

- `email` e `emailComercial`: e-mails dos botões de atendimento e fornecedores.
- `instagram`: nome de usuário, sem `@`.
- `telefone`: número comercial completo com código do país e DDD, por exemplo no formato `55DDDNÚMERO`. Pode conter espaços, parênteses e hífen. Não inclua o zero de operadora.
- `whatsapp`: número completo com país e DDD, apenas dígitos. O botão só aparece quando preenchido com um número válido.
- `endereco`: endereço completo a ser mostrado na página.
- `mapa`: link HTTPS do Google Maps ou Apple Maps. O botão de localização só aparece com um link válido.
- `horarios`: dias e horários de atendimento.
- `aviso`: atualmente “Em breve em Marabá”. Pode ser alterado ou ficar vazio para ocultar.
- `cidade`, `mensagem` e `nome`: informações da marca.

Deixe campos desconhecidos como `""`. Não use números de exemplo na página publicada. Telefones e endereço ainda estão vazios porque não foram informados. Ao mudar e-mails ou Instagram, atualize também os links de reserva no HTML para visitantes com JavaScript desativado. A edição ocorre pelo GitHub autenticado; não há painel administrativo público ou senha inserida no código.

“Salvar contato” baixa um arquivo VCF com os dados atuais. A agenda do visitante **não se atualiza automaticamente**; o QR continua levando à página com os contatos atualizados.

## Arquivos para a gráfica

- `qr-brado-contatos.svg`: arte vetorial, preferível para impressão.
- `qr-brado-contatos.png`: imagem em alta resolução, com fundo branco e margem de leitura.

O QR foi gerado diretamente para o domínio da Brado, sem encurtador ou assinatura de serviço de QR. Imprima em preto sobre área branca lisa. Preserve a margem branca, não estique e não coloque a marca sobre os módulos. Recomenda-se **ao menos 3 × 3 cm**, aumentando conforme o material e a qualidade da impressão. Em sacola kraft ou escura, peça fundo branco opaco. Faça uma prova no material real e leia com mais de um celular antes de imprimir o lote.

As medidas são orientação de produção, não garantia de leitura: contraste, textura, curvatura e acabamento da sacola afetam o resultado. Manter o domínio registrado e a página publicada é necessário para a continuidade do QR.
