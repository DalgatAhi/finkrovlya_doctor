import { Input, Textarea } from '@/components/ui/Input';

interface ContactsData {
  name: string;
  phone: string;
  comment: string;
}

interface ContactsFormProps {
  value: ContactsData;
  onChange: (data: ContactsData) => void;
  errors?: Partial<ContactsData>;
}

export function ContactsForm({ value, onChange, errors }: ContactsFormProps) {
  function set(field: keyof ContactsData, val: string) {
    onChange({ ...value, [field]: val });
  }

  return (
    <div className="space-y-4">
      <Input
        label="Ваше имя"
        placeholder="Иван"
        required
        value={value.name}
        onChange={(e) => set('name', e.target.value)}
        error={errors?.name}
      />
      <Input
        label="Телефон"
        placeholder="+7 (999) 000-00-00"
        type="tel"
        required
        value={value.phone}
        onChange={(e) => set('phone', e.target.value)}
        error={errors?.phone}
        hint="Специалист позвонит, чтобы уточнить детали"
      />
      <Textarea
        label="Комментарий"
        placeholder="Опишите подробнее: когда появилась проблема, что именно происходит..."
        value={value.comment}
        onChange={(e) => set('comment', e.target.value)}
      />

      <div className="bg-gray-50 dark:bg-white/[0.06] rounded-xl px-4 py-3">
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
          Нажимая «Получить предварительный разбор», вы соглашаетесь на обратную связь от специалиста ФИН КРОВЛЯ.{' '}
          <span className="font-medium text-gray-700 dark:text-gray-200">Это бесплатно.</span>
        </p>
      </div>
    </div>
  );
}
