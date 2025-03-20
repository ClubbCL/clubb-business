import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

interface AddCollaboratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { email: string; location: string; role: string }) => void;
}

export function AddCollaboratorModal({ isOpen, onClose, onSubmit }: AddCollaboratorModalProps) {
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = () => {
    onSubmit({ email, location, role });
    setEmail('');
    setLocation('');
    setRole('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Agregar colaborador</DialogTitle>
          <p className="text-sm text-gray-500">
            El colaborador recibirá una invitación para validar su cuenta y unirse al equipo.
          </p>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="location">Local/Ubicación</Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger id="location">
                <SelectValue placeholder="Seleccionar ubicación" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="location1">Ubicación 1</SelectItem>
                <SelectItem value="location2">Ubicación 2</SelectItem>
                <SelectItem value="location3">Ubicación 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="role">Rol</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger id="role">
                <SelectValue placeholder="Seleccionar rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="manager">Gerente</SelectItem>
                <SelectItem value="staff">Staff</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="text-sm text-blue-600 cursor-pointer hover:underline">Roles disponibles</div>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Enviar invitación</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
