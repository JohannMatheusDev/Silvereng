import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        
        if (!name || !email || !message) {
            return NextResponse.json({ error: "Por favor, preencha todos os campos." }, { status: 400 });
        }
        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            },
            body: JSON.stringify({
            from: "onboarding@resend.dev", 
            to: process.env.EMAIL_DESTINO,
            subject: `💼 NOVO LEAD: ${name.toUpperCase()}`,
                html: `
                    <div style="font-family: sans-serif; padding: 20px; color: #111; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px;">
                        <h2 style="color: #A74B1C; border-bottom: 2px solid #A74B1C; padding-bottom: 10px; margin-top: 0;">Novo Contato Institucional</h2>
                        <p style="margin-core: 15px;"><strong>Nome do Investidor:</strong> ${name}</p>
                        <p><strong>E-mail de Contato:</strong> ${email}</p>
                        <div style="background: #f4f6f8; padding: 15px; border-radius: 5px; margin-top: 20px; border-left: 4px solid #A74B1C;">
                            <strong>Mensagem enviada:</strong><br/>
                            <p style="margin-top: 5px; white-space: pre-line;">${message}</p>
                        </div>
                        <br/>
                        <hr style="border: 0; border-top: 1px solid #eee;" />
                        <span style="font-size: 10px; color: #aaa; display: block; text-align: center;">Enviado de forma segura via criptografia SSL - Plataforma Silvereng</span>
                    </div>
                `,
            }),
        });

        const resData = await res.json();

        if (!res.ok) {
            console.error("Erro do Resend:", resData);
            throw new Error("Falha no disparo do e-mail.");
        }

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Erro interno de segurança." }, { status: 500 });
    }
}