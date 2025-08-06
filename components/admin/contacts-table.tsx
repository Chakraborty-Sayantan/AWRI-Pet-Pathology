"use client"

import { useEffect, useState } from "react"
import {  Table,   TableBody,   TableCell,   TableHead,   TableHeader,   TableRow, } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "../ui/badge";

interface Contact {
    id: number;
    name: string;
    email: string;
    message: string;
    created_at: string;
    newsletter: boolean;
}

export function ContactsTable() {
    const [contacts, setContacts] = useState<Contact[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('admin-token');
        const fetchContacts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/contact', {
                    headers: { 'x-auth-token': token || '' }
                });
            } catch (error) {
                console.error("Failed to fetch contacts:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchContacts();
    }, []);

    if (isLoading) {
        return <div>Loading messages...</div>
    }

    return (
        <Card>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>From</TableHead>
                            <TableHead>Message</TableHead>
                            <TableHead>Subscribed</TableHead>
                            <TableHead>Received</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {contacts.map((contact) => (
                            <TableRow key={contact.id}>
                                <TableCell>
                                    <div className="font-medium">{contact.name}</div>
                                    <div className="text-sm text-muted-foreground">{contact.email}</div>
                                </TableCell>
                                <TableCell className="max-w-md truncate">{contact.message}</TableCell>
                                <TableCell>
                                    <Badge variant={contact.newsletter ? 'default' : 'outline'}>
                                        {contact.newsletter ? 'Yes' : 'No'}
                                    </Badge>
                                </TableCell>
                                <TableCell>{new Date(contact.created_at).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
